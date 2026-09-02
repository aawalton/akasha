---
id: 1e08bb62-7407-506d-86de-2787dedf98bc
page-type-slug: old-ops-command
title: "Ops mobile cut-record"
slug: ops-mobile-cut-record
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/cut-record.ts
path: mobile cut-record
irreversible: false
---

# Definition

- **Ops mobile cut-record** — the cut fingerprint filed for a TestFlight build already at Apple.

# Help

File the cut fingerprint for a TestFlight build that is already at Apple.

THIS IS THE SECOND CALLER, not the first. The deploy files the fingerprint as part of taking the cut, and prints this exact call when its own filing does not land. Run what it printed rather than composing one: every value here describes a build that already stands at Apple, and none of them can be worked out again from this machine once the cut has gone.

THE BUILD NUMBER IS THE ONE APP STORE CONNECT ASSIGNED, which is the number the failed cut printed. It is a whole number of at least 1, and a wrong one files a fingerprint against a build that is not the one at Apple, with nothing downstream able to tell.

A BUILD THAT ALREADY CARRIES A FINGERPRINT IS LEFT ALONE. Where the app's latest filed fingerprint names this same build number, nothing is written and the call says so, so running it twice costs nothing.

`--cut-at` DEFAULTS TO NOW, which is right only for a filing made the moment the cut failed. Every later filing gives the instant the cut printed, or the fingerprint says the build was taken when it was recorded.

`--shell-sha` is omitted where the cut named none, and `--build-input-tree-hash` only where the cut printed none: a fingerprint carrying no build-input hash reads as predating the basis and leaves a cut owed.

Nothing here talks to Apple. It writes the fingerprint page and commits it, and a run that could not write or could not commit filed nothing and can be run again.
