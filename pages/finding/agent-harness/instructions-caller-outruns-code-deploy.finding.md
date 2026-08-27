---
id: 193a4bb4-248e-536f-9e29-7fffb5c302eb
slug: instructions-caller-outruns-code-deploy
page-type-slug: finding
title: "Instructions caller outruns code deploy"
domain-slug: domain/agent-harness
---

# Claim

An instructions-repo commit naming a code-repo module that is not yet deployed takes the verb down for every seat the moment it lands, because `codeModule` throws on an unresolvable specifier and nothing catches it — the same two-repo interval that strands a removal, running forward, and costing a live capability rather than a red check.

# Evidence

Observed 2026-08-15 in `~/instructions`, from project #19205's work in flight.

`ops graph off-workstation` exited 70 with: "`@infra/checks/sourced-shell-files` resolves to nothing from /home/walton/code". The verb was unusable by every seat, not merely wrong.

The cause was an instructions-repo commit alone. #19205's new caller landed on `main` at `891ddd6a` naming a module whose code-repo half was committed on a branch and not deployed. No code commit was involved and no gate could have refused it: the instructions repo has no way to know what the deployed code tree exports.

`tools/ops/code.ts` is where it fails. `load()` calls `Bun.resolveSync(specifier, codeRoot())` and throws `CodeModuleError` when the specifier resolves to nothing, and `off-workstation.ts` awaits five such loads in one `Promise.all` at line 183. One unresolvable specifier takes all five down, and with them the whole verb.

The window is structural. An instructions commit is live at once; a code change waits on a deploy queue. Every reach into the code repo therefore has an interval where the caller stands and the callee does not, and today that was long enough for the fleet's boundary instrument to be down.

The seat hit a bind rather than an oversight. Its branch CI needs the caller present, because `check-ast-unused` reads its entry set from the live instructions repo and will not credit the new code-repo export as reached while nothing names it. So the caller must stand, and standing is what broke the verb. It reverted to restore service, putting its own branch back to red.

This is the same interval recorded at `pages/finding/agent-harness/replace-before-removing-interval-unwatched.finding.md`, running the other way. There the removal never followed the replacement and a check went red; here the callee has not yet deployed behind the caller and a capability went out. One direction is caught by an instrument, on someone else's branch. This one is caught by whoever next runs the verb.
