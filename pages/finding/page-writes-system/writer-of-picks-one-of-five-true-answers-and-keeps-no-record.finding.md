---
id: 4b99f5cc-a950-52f5-a4c0-adcab5fa4af4
page-type-slug: finding
slug: writer-of-picks-one-of-five-true-answers-and-keeps-no-record
title: "writerOf folds an app, an agent and a command into one string by precedence, and the app wins"
domain-slug: domain/page-writes-system
---

# Claim

One write has up to five true answers to who wrote it. `writerOf` at `shared/pages-access/src/file-write.ts:34-39` returns one and keeps no record of the rest. An app name in `PAGE_WRITER` outranks the acting agent, so a write an agent makes inside an app is attributed to the app alone. What survives reaches only a git commit subject, and is dropped on the `.uncommitted` path where 4,306,999 of 4,718,491 rows stand.

# Evidence

Taken 2026-08-28 at akasha `134a715a5b`.

`writerOf` folds a stated argument and three environment values with `??`: `stated ?? writer ?? actingUnder(seat) ?? seat`, falling back to `DEFAULT_WRITER = "pages-access"`. Run against that function itself, one environment holding all of them:

- `AGENT_ID` alone gives the seat uuid.
- plus `ACTING_AGENT_ID` gives the delegate.
- plus `PAGE_WRITER=temper-web` gives `temper-web`.
- plus a stated `ops chess-puzzle sync` gives `ops chess-puzzle sync`.
- none of them gives `pages-access`.

Every line is true of the same write. `file-write.unit.test.ts:137-142` pins the order on purpose: "keeps a stated writer ahead of any agent in the environment".

The five are of three kinds. `AGENT_ID` and `ACTING_AGENT_ID` name an agent. `PAGE_WRITER` names an app, stated as container env: `temper-web`, `alanwalton-web`, `atlas-web`. A stated writer names a command or a code path: `ops chess-puzzle sync`, `sms-webhook`, `seat-page-writer`. One slot carries all three.

`tools/lib/gated-write.ts:37` spawns with `env: { ...process.env, AGENT_ID: writer, ACTING_AGENT_ID: "" }`, putting a code-path name where an agent id belongs and clearing the delegate, so the child's writes and its recorded reads name an agent that does not exist.

What survives goes to `writeRows(..., writer)` at `tools/lib/page-query-landing.ts:32`, arrives as `by`, and is read only by `messageFor` at `tools/lib/page-write-commit.ts:19-21`, which `rowsLanded` skips for `.uncommitted`.

Census over 11,579 sidecars, 4,718,491 rows, 0 unparsed: `agent-id` on 4,306,853, every one uncommitted and under `pages/seat-log-day/`. Of the 411,492 committed rows, none carries a writer of any spelling. Same probe, the key name alone changed: `agentId` 0, `by` 0, `writer` 0, `written-by` 0, `actor` 0, `author` 0, `seat` 0, against `written-at` 4,306,875, `source` 5,761, `userId` 3,394, `owner` 9. `agent-id` is declared once, on `log-line` alone, at `pages/page-property-definition/log-line-agent-id.page-property-definition.md:6`, is not required, and no `.ts` reads it back.
