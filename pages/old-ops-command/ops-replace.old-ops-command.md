---
id: 4de6f2a5-caf2-59e4-881b-1d8cac627b0f
page-type-slug: old-ops-command
title: "Ops replace"
slug: ops-replace
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/global/replace/replace.command.code.attachment.ts
path: replace
irreversible: false
---

# Definition

- **Ops replace** — one stated substitution across every file carrying it, gated together and landed or refused as one.

# Help

Replace one exact string wherever it appears, gating every file it changes.

Takes the substitution rather than the file list: every tracked file under the paths named carrying --old-string is rewritten, and the set is admitted whole or refused whole. It is `edit` with the paths discovered instead of declared, which is the shape a vocabulary rename actually has — enumerating the files by hand is the error the search exists to remove.

NOTHING IS INFERRED FROM THE STRINGS. There is no regular expression, no word boundary and no case folding: what matches is the bytes you gave, and a rename needing three spellings is three calls. A substring of a longer word matches, so name enough surrounding text if that is not what you meant, and read the per-file counts it reports before letting it land. Every occurrence in a file is replaced, there being no single-match form: a call that found one file out of ninety and rewrote part of it would leave the repo mid-rename with nothing saying so.

WHAT IS SEARCHED is what git tracks under the paths named, quarantine included: text under `dirty/` is text, and a rename skipping it would leave the old spelling alive in the one place nobody is watching. A file holding a NUL byte or bytes that are not UTF-8 is passed over rather than decoded, and every one passed over that carries the string is named.

A call addressing akasha has the bodies it composed gated before any of them reaches disk. A call addressing any other repository lands unjudged. A path inside no repository is written where it lies, with nothing committing it. A stated substitution is shaped by nothing anyone read, so the checks weighing what its writer read stand aside, as they do for `rm`.

A file that changes between the read a body was composed from and the write that lands it refuses the whole call, by mtime, naming every file that moved. What lands is the whole body, so a change made elsewhere in the file would be reverted with nothing saying so.

REFUSED BEFORE ANY CHECK RUNS: an empty --old-string, which matches everywhere and nowhere; an --old-string equal to --new-string, which asks for no change; nothing carrying --old-string, which is a typo rather than a no-op; and a flag it does not take, rather than ignoring it.
