---
page-type-slug: finding
slug: a-named-refusal-exits-as-an-unhandled-defect
title: "A command that names exactly why it refused exits 70, the code its own help defines as an unhandled defect"
domain-slug: domain/ops-cli
---

# Claim

A command that knows exactly why it is refusing reports that refusal as an unhandled defect. `ops exercise session-show` says "no open session — a session has to be started before anything records against it, or pass --session to name one" and exits 70. `ops exercise history --exercise "Bench Press"` names the ambiguity and lists the candidates, and exits 70. Every `ops` command's own help defines 70 as "unclassified error: the command threw something the CLI could not classify, so nothing is established about what went wrong — not a caller mistake, and not a failure this command knows how to have. An unhandled defect."

So the exit code says nothing is established about what went wrong, while the text on the same run establishes it precisely.

The cause is not in either command. Domain logic throws a plain `Error`, and the dispatcher maps every thrown thing whose name it does not recognise to 70. Four codes with meanings — input, data, operational — sit unused for these cases, and reaching them requires the throwing code to know about a CLI error class it should not have to.

The cost is that nothing downstream can tell a refusal from a crash. On the night the page query service went away, twelve `ops` commands exited 70 because they dialed a deleted service and three exited 70 because they answered correctly, and no caller reading exit codes could separate the outage from the ordinary.

# Evidence

Read and run on 2026-08-28 against `bccf33790` on `main`. Each command below was invoked as `timeout 90 ops <argv>` with its exit code recorded.

**Three runs that answered correctly and reported an unhandled defect.** `ops exercise session-show` exited **70** in 0.49s printing `no open session — a session has to be started before anything records against it, or pass --session to name one`. `ops exercise next-set` exited **70** in 0.49s with the identical line. `ops exercise history --exercise "Bench Press"` exited **70** in 0.68s printing `exercise "Bench Press" is ambiguous — candidates: "Barbell Bench Press - Medium Grip", "Barbell Guillotine Bench Press", "Barbell Incline Bench Press - Medium Grip", "Bench Press - Powerlifting", "Bench Press - With Bands", …`. The last one had read the catalogue to know that: re-run as `ops exercise history --exercise "Dumbbell Bench Press"` it exits **0** and prints sixteen sets and a best.

**What 70 is declared to mean.** Every command's help ends with the same inherited line: `70    unclassified error: the command threw something the CLI could not classify, so nothing is established about what went wrong — not a caller mistake, and not a failure this command knows how to have. An unhandled defect. Inherited by every ops command.` Each of the three runs above is a caller mistake, and each is a failure the command knows how to have.

**The mechanism, and it is general.** `tools/lib/exit.ts:1-7` declares `EXIT = { OK: 0, INPUT: 1, DATA: 2, OPERATIONAL: 3, UNCLASSIFIED: 70 }`. `:9-15` declares `CARRIES_A_CODE` as the five names `ExitError`, `CliError`, `InputError`, `DataError`, `OperationalError`. `:43-46` is `exitCodeOf`, whose first line is `if (!(thrown instanceof Error) || !CARRIES_A_CODE.has(thrown.name)) return EXIT.UNCLASSIFIED`. So a thrown `Error` whose `name` is the default `"Error"` becomes 70 regardless of what it says. `tools/ops/cli.ts:36-38` is the only place it is applied — `catch (err) { dispatchError = err; exitCode = exitCodeOf(err) }` — so this is the one route every command's failure takes.

**The throws are deliberate refusals in domain code.** `collections/exercises/src/cli/lib/resolve.ts:44` is `throw new Error(\`${label} "${ref}" is ambiguous — candidates: ${titles}${more}\`)`, and `:65` throws the "no open session" sentence. Both are plain `Error`, so neither name is in `CARRIES_A_CODE`. Neither file imports `tools/lib/exit.ts`, and on `pages/repo/akasha-repo.repo.md:25` — "Domain logic lives in a package of its own domain, unaware of any command that calls it" — neither should have to. So the defect is not that these two lines chose the wrong helper; it is that the only way to reach a classified code is to know about the CLI's error classes.

**The cost, measured on one night.** Over the same session, twelve read-only `ops` commands exited 70 because they dialed the deleted page query service — `exercise today`, `constraint-list`, `equipment-list`, `digest`, `ranks`, `mobility-show`, `history`, `session-show`, `next-set`, `tower state`, `tower snapshot`, `mobile cut-status` — and after the repair at `ff4d43cbd` the same set answered, except the three above which still exit 70 on correct behaviour. Sorting the outage from the ordinary took reading every message; no exit code distinguished them. `EXIT.DATA` (2) and `EXIT.INPUT` (1) both exist and are unused for these cases.

Not measured: how many other commands refuse through a plain `Error`. Only the three met here were run, and `collections/exercises/src/cli/lib/resolve.ts` is one file of one package.

Not judged here: whether the repair is a wider `CARRIES_A_CODE`, a convention that domain refusals carry a `name`, a mapping the dispatcher owns, or something else. Each trades differently against the akasha-repo line above, and that is a decision rather than a reading.
