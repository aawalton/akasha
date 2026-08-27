---
id: 833526fc-5865-5563-bfeb-fbd01f953263
page-type-slug: finding
title: "Objective description unbound"
domain-slug: domain/global
---

# Claim

Nothing binds an objective's description at write time, so nine checked objectives across `projects/` and `initiatives/` carry a description their own ticked box falsifies.

# Evidence

Measured 2026-08-04, running `define-principle-or-rule` against a finding under `findings/principle/`.

`tools/document/schemas/initiative.ts` and `tools/document/schemas/project.ts` carry an identical `# Objective` construction — `[x] **statement** description` — and an identical docblock, "the END STATE, never the means of reaching or checking it", in TypeScript no seat loads.

The write-time stages bind the statement and stop. `tasks/lead/define-initiative.md` stage 3: "Write each objective as a state the system is in, never an act someone performs." `tasks/lead/define-project.md` stage 2: "State the end state and never the route." Neither names the description. `tasks/lead/review-initiative.md` stage 1 then says "Leave every statement and description as the end state it names", instructing a reviewer not to touch it and presuming it already is one.

Across `~/memory`, 148 objectives stand checked and 141 carry a description. Nine hold one the box above it contradicts, among them `[x] **The bypass is closed and main lands through the gates again** Sixty-one commits sit unpushed on local main`, and `[x] **A document owed a review is named by an instrument** ... No instrument can compute it today`. Only two of the nine turn on a number, so the axis is the gap statement rather than the measured figure.

Commit `00c1fa1` shows the mechanism: `[ ]` became `[x]` and the description crossed a single-character edit unchanged, after which it reads as the reason the objective is met. Two siblings in that file were later rewritten free of their figures by hand at `76fe5d5` and `fb8fa12`. All three were direct `memory: edit` commits rather than passes of either task, so a bullet on either would have caught none.

Not measured: whether each of the nine was written as a gap or falsified at the flip; only `00c1fa1` was traced. `rulings/` was not opened.
