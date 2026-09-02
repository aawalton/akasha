#!/usr/bin/env bun

/**
 * THE PROCESS THE WINDOW'S OBSERVATIONS ARE WRITTEN BY, so that the host's one thread never does it.
 *
 * `written(… 'patch-state' …)` lands about two kilobytes of YAML beside the window's page, and
 * that part is cheap. What is not cheap is being told where the page stands: `whereFor` asks the
 * registry, and a page type filed `**​/*.<slug>.md` names no folder, so the question is answered by
 * walking every markdown file in the checkout. Measured on this box at load 17, one write held the
 * calling thread for 202-430ms, median 307ms, and six writes in a row read as a single unbroken
 * 1521ms block — the `await`s inside `written` settle as microtasks and never let the timer phase
 * run. The extension's pollers ask for a write about once a second. That is a third of the event
 * loop, permanently, and it is why every panel and the status line freeze together: a blocked
 * extension host repaints nothing.
 *
 * The walk is not made cheaper here and nothing about the write is changed. It is the same call,
 * against the same files, with the same gates, moved to a thread that is not the one drawing
 * Alan's editor.
 *
 * SPEAKS newline-delimited JSON: asks arrive on stdin, answers leave on **fd 3**. Answers go on a
 * pipe of their own because `written` itself writes to stdout and stderr — `page-query-landing.ts`
 * prints a line whenever a write takes over two seconds — and a diagnostic must never be read as
 * an answer.
 *
 * WRITES ARE SERIAL. Every ask lands in the same file, so two at once would only meet each other
 * in `exclusively`'s lock. Holding them in a queue keeps the order the host asked in.
 *
 * EXITS WHEN STDIN CLOSES, and drains the queue first. That is the whole durability story: stdin
 * closing is what happens when the host is disposed *and* when it is killed, and in both cases
 * everything already handed over is written before this process goes.
 *
 * AND IT DEFERS NO COMMITS. The store called `deferCommits()` before every write, which for this
 * act was always dead weight: `patchState` lands `<page>.uncommitted.yaml` and never reaches
 * `landOne`, so it queues no commit to defer. What the call did do was register exit handlers and
 * run `recoverLandings()`, which adopts landing journals from dead writers and commits them with
 * `git` — on the extension host's drawing thread, for writes that were not its own. Calling it
 * here instead would be worse than not calling it: a journal is keyed by the root alone and
 * `writeJournal` overwrites, so this process and the host — which still defers, from
 * `editor-layout` — would clobber each other's record and each adopt paths the other was landing.
 */

import { writeSync } from 'node:fs';
import { written } from '@tools/lib/page-query-landing';
import { rootsHere } from '@akasha/pages-system/checkout-roots';

const ANSWER_FD = 3;

const PROTOCOL = 1;

const SAYS = '[editor-observations]';

interface Ask {
	readonly id: number;
	readonly act: string;
	readonly pageType: string;
	readonly name: string;
	readonly url: string;
	readonly method: string;
	readonly headers: Record<string, string>;
	readonly body: string;
}

// A short write to a pipe is a partial write, not a failure, so the rest is written rather than
// dropped. An answer that arrives as a prefix is a syntax error at a byte nobody chose.
function writeAll(fd: number, text: string): undefined {
	const buffer = Buffer.from(text, 'utf8');
	let at = 0;
	while (at < buffer.length) {
		at += writeSync(fd, buffer, at);
	}
	return undefined;
}

function say(said: Record<string, unknown>): undefined {
	writeAll(ANSWER_FD, `${JSON.stringify(said)}\n`);
	return undefined;
}

const queue: Ask[] = [];

let working = false;

let closing = false;

function askOf(line: string): Ask | null {
	let parsed: unknown;
	try {
		parsed = JSON.parse(line);
	} catch {
		return null;
	}
	if (parsed === null || typeof parsed !== 'object') { return null; }
	const said = parsed as Record<string, unknown>;
	if (typeof said['id'] !== 'number') { return null; }
	return {
		id: said['id'],
		act: typeof said['act'] === 'string' ? said['act'] : 'patch-state',
		pageType: typeof said['pageType'] === 'string' ? said['pageType'] : '',
		name: typeof said['name'] === 'string' ? said['name'] : '',
		url: typeof said['url'] === 'string' ? said['url'] : '',
		method: typeof said['method'] === 'string' ? said['method'] : 'POST',
		headers:
			typeof said['headers'] === 'object' && said['headers'] !== null
				? (said['headers'] as Record<string, string>)
				: {},
		body: typeof said['body'] === 'string' ? said['body'] : '',
	};
}

async function land(ask: Ask): Promise<void> {
	try {
		const request = new Request(ask.url, {
			method: ask.method,
			headers: ask.headers,
			body: ask.body,
		});
		const said = await written(rootsHere(), ask.act as never, ask.pageType, ask.name, request, SAYS);
		say({ id: ask.id, ok: true, status: said.status, body: said.body });
	} catch (thrown) {
		say({ id: ask.id, ok: false, status: 500, saying: String(thrown) });
	}
}

// One at a time, in the order the host asked, and never re-entered: `working` is what keeps a
// second drain from starting while the first is inside a write.
async function drain(): Promise<void> {
	if (working) { return; }
	working = true;
	try {
		for (;;) {
			const ask = queue.shift();
			if (ask === undefined) { break; }
			await land(ask);
		}
	} finally {
		working = false;
	}
	// The queue is empty and nothing is in flight, so a host that has already gone loses nothing
	// by this exiting now.
	if (closing) { process.exit(0); }
}

function finish(): void {
	if (closing) { return; }
	closing = true;
	if (!working && queue.length === 0) { process.exit(0); }
	void drain();
}

let held = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk: string) => {
	held += chunk;
	for (;;) {
		const cut = held.indexOf('\n');
		if (cut < 0) { break; }
		const line = held.slice(0, cut);
		held = held.slice(cut + 1);
		if (line.trim() === '') { continue; }
		const ask = askOf(line);
		if (ask === null) {
			process.stderr.write(`${SAYS} a line on stdin was not an ask and was thrown away\n`);
			continue;
		}
		queue.push(ask);
	}
	void drain();
});
process.stdin.on('end', () => finish());
process.stdin.on('close', () => finish());
process.stdin.on('error', () => finish());

try {
	say({ hello: PROTOCOL, pid: process.pid });
} catch (thrown) {
	process.stderr.write(
		`${SAYS} nothing is listening on fd ${ANSWER_FD}, and that is where every answer goes — ` +
		`spawn this with a fourth pipe (${String(thrown)})\n`
	);
	process.exit(1);
}
