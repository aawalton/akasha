---
id: 14e04d88-7d4f-5b14-bd3c-1ad3cecb29ec
slug: pass-ignores-a-misspelled-dry-run
page-type-slug: finding
title: "Pass ignores a misspelled dry run"
domain-slug: domain/email
---

# Claim

`tools/email-pass.ts` reads `--dry-run` with `args.includes`, so any misspelling of that flag is silently ignored and the run acts on Alan's real mailbox instead of reporting what it would have done.

# Evidence

The whole of the argument handling in `tools/email-pass.ts` is four lines:

    const args = process.argv.slice(2)
    const dryRun = args.includes("--dry-run")
    const named = args.indexOf("--person")
    const person = named === -1 ? "alan" : (args[named + 1] ?? "alan")

There is no parser, so nothing refuses an unknown token. `--dryrun`, `--dry_run` and `--dry-run=true` all leave `dryRun` false, and the next line runs `onePass(person, root, await mailbox(), { dryRun })` against the live mailbox — acting on mail rather than reporting on it. The defaulting has the same shape: `--person` with nothing after it silently means Alan rather than refusing.

This is the class the `ops` surface was audited for, where 55 of 762 verbs ran their bodies on an unknown flag. These two files sit outside that surface. They carry no `export const tool`, so no `ops` verb reaches them and `verbs-declare-help` has a population they are not in. A search of this repository for anything naming either file returns nothing but git objects, so whatever launches them stands outside and is invisible from here.

`tools/email-watch.ts` has the opposite shape and the same problem by another route. It takes no flags — person, handler, interval, sender and root all come from environment variables with defaults — and has no dry-run at all. It calls `onePass` for real on a sixty-second loop. A misspelled `EMAIL_WORKER_PERSON` falls back to `alan` silently.

Neither has fired. Both are the shape of a one-typo hazard on the store where a wrong act is least recoverable: `Publication` says sending is a copy into systems no delete reaches.

Filed rather than repaired because the fix is a ruling. A real parser makes a typo refuse, and it also makes every existing invocation outside this repository something that must be found and checked first — and nothing here can see those invocations.
