---
page-type-slug: finding
slug: nothing-checks-the-sentence-after-the-figure
title: "Every guard on an agent's evidence checks its figures, and three correct figures carried three false consequences unchecked"
domain-slug: domain/agent-evidence
---

# Claim

Everything that checks an agent's evidence checks its figures. This domain's own Condition is about a figure — that it was taken since what it measures last changed. Nothing checks the sentence after the figure.

So the failure that happened three times in one night was never a wrong number. Each time the measurement was correct, was taken freshly, and survived re-checking afterwards. What was wrong was the consequence drawn from it in the next paragraph, and no gate, check or rule looked there.

The two do not travel alike. A figure stays on the page it was written on. A consequence is the part that goes into a brief, a message to another seat, and a decision someone else acts on, so by the time it is wrong it is somewhere the figure never reached. In one case an agent wrote "nothing here is broken, somebody decided this" and, two paragraphs later on the same page, drew a consequence that contradicted it. Nine gates passed the page.

What caught all three was the same act each time: somebody re-derived the consequence from the numbers instead of accepting it, having noticed that the numbers were not in doubt. It cost one or two commands each time. Nothing prompted it and nothing would have missed it.

# Evidence

Three instances from one night's work on the pages system, 2026-08-27 into 2026-08-28. In each, the measurement is named with what took it, and the consequence with what overturned it. I took the measurements in all three and drew the consequence in all three; a fourth, where a figure itself was wrong rather than its consequence, is set out at the end because it is the case this does NOT describe.

**One. A pod read correctly, a design read wrong.** Measured: `kubectl -n alanwalton exec web-874d9684f-jcxg6 -c code-sync -- git -C /app/repo remote -v` gave `alan/code.git`, and `find /app -name "*.page-type.md" | wc -l` gave `0`. Both still hold. Consequence drawn: "in-process page answering is not viable in the deployed app pods." False — `infra/k8s-types/src/orchestrator-cache-locations.ts:15-21` on main already points that cache at `alan/akasha.git`, and `alanwalton/web/generated/web-deployment.generated.yaml:201` carries a `git remote set-url` repair for exactly the case measured. The pod was behind the repository. Overturned by a subagent reading current main while I read the running cluster — two accurate readings disagreeing, which is what exposed it.

**Two. A service read correctly, a schedule read wrong.** Measured: `systemctl --user show ci-container-dispatcher` gave `ActiveEnterTimestamp=Fri 2026-08-28 02:19:50 MDT`, after the fix commit `f3a52ce96` at `01:55:30 -0600`, so the running service held the fixed code. True. Consequence drawn and relayed onward: that the pending repair "may now flow on its own." False — `main-pipeline-creator`, the service that gives every commit landing on main its pipeline, was already off. I overturned this one myself about an hour later, after it had been passed to another seat.

**Three. Every figure correct, one paragraph false.** A finding filed at `8c74ed4af` carried `systemctl --user is-enabled main-pipeline-creator` → `not-found`, `ActiveState=inactive`, `Result=success`, `NRestarts=0`, a clean `Stopping…`/`Stopped` at `2026-08-22T15:37:32-06:00`, and `enabled: false` at `pages/workstation-service/main-pipeline-creator.workstation-service.md:11`. Every one still holds. Its consequence — that a commit repairing something on the cluster "cannot reach the cluster from main while this stands" — is false: `ops-cli/global/deploy/deploy.command.code.attachment.ts:219` shells `kubectl` server-side apply straight from the workstation, and the command's own document reads "one named service put into production from the manifests its own synth emits". No pipeline is in that path. `pages/initiative/dalla-deploy-system.initiative.md:13` states "All services are deployed only using the `ops deploy` command", so the disabled service is a retirement rather than a fault.

**The self-contradiction inside one page, and what passed it.** That same finding's Claim opened "Nothing here is broken. The service stopped cleanly… Somebody decided this, six days ago", and four sentences later read "A commit that repairs something on the cluster cannot reach the cluster from main while this stands." A deliberate retirement and a live blockage, asserted about one fact on one page. `ops finding create` ran 9 akasha checks over it and none refused. Not a criticism of those checks: none of them is aimed at whether a paragraph follows from the paragraph above it, and none claims to be.

**What the three have in common, and what they cost.** No figure was stale, so this domain's Condition — "Every figure an agent holds as true was taken since what it measures last changed" — held in all three. Each consequence was overturned by one or two commands: reading `main` beside the cluster; reading a second service's state; reading the deploy command's own source. Each had already been relayed to another agent or written to disk before it was caught.

**The case this is not.** Separately that night a count of "72 of 297 modules" was relayed to me and proved to be 39 by transitive closure and 1 by direct import (`grep -rl "@shared/pages-query" tools/commands/` returns one file). That is a wrong figure, and this domain's existing shape already covers it: a figure is checkable by re-measuring, and re-measuring found it. The three above are the opposite case, and re-measuring finds nothing wrong with them.

Not measured: how often this happens outside one night's work, and whether the pattern is particular to agents reporting to other agents rather than to a person. Three instances in one session is what was observed, not a rate.

Not judged here: what would catch it. A check on prose, a habit of re-deriving before relaying, and a convention separating what was measured from what follows from it all sit differently against Parsimony on `pages/domain/global.domain.md:54-62`, and choosing between them is a decision rather than a reading.
