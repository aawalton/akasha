---
id: 153ba848-4393-57a6-8546-680c1bb6a114
slug: third-party-libraries-banned
page-type-slug: finding
title: "Third party libraries banned"
domain-slug: domain/temper
---

# Claim

Alan ruled on 2026-07-25 that no third-party library is to be hosted or redistributed from tempereso.com — the whole class of 28 community ports under `packages/temper/shared/addon-libraries/`, not merely the two lacking a licence grant — with TamrielTradeCentre (external, user-installed via Minion) as the sole exception, and any Temper dependency on one is to be rewritten as Temper code rather than licensed or pulled.

# Evidence

Project #16111, domain `temper`, status `someday_maybe`, `live-on: deploy`, no objective ever written; text below is the row's capture, moved off its retired `notes` attribute 2026-08-15 (cut at a paragraph boundary before reaching the promised list of the six shipped libraries' consumer chains).

Alan's ruling, verbatim, 2026-07-25, answering question 019f992e-8d6c (the LibAsync/LibTableFunctions licence disposition): "This isn't a crisis. Third-part[y] libraries shouldn't be hosted, but other than TTC, they shouldn't be in the system at all. If Temper depends on any of them, we need to rewrite the needed functionality in Temper."

Decides: (1) no third-party library hosted from tempereso.com; (2) other than TamrielTradeCentre, none in the system at all — the whole class of 28 community ports under `packages/temper/shared/addon-libraries/`, not just the two lacking a licence grant or the six currently shipped; (3) a Temper dependency on one is rewritten as Temper code; (4) TTC is the sole exception (external, Minion-installed, never archived). "Not a crisis" is directional: no offline pull, no yanking, no forced-green gates.

Trigger: #16016 made six libraries publicly downloadable; #16094 found LibAsync has no licence grant anywhere upstream ever, and LibTableFunctions-1.0 is all-rights-reserved by default.

Sharpening finding: Temper ships ports (TSTL-translated TypeScript rewrites), which under Artistic-2.0 count as modified versions in compiled form, triggering Section 4 clause (6) even for cleanly-licensed libraries — renaming to comply (option b) is excluded because drop-in identity (exact folder/global/AddOnVersion) is load-bearing for consumer `DependsOn` gates. Only LibCustomMenu (Unlicense) was ever unconditional. The ruling dissolves the clause by removing the subject.

First work item stated: size the consumed surface; do not start rewriting. Pilot execution tracked on #16116 (renaming LibTableFunctions-1.0), filed as a companion finding.
