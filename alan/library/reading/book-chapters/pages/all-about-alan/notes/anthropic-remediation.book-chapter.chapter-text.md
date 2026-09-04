
# Anthropic remediation

> Anthropic remediation — sequence the migration off the Claude API onto local-compute open-weights inference, funded out of the existing subscription budget. Highest-priority load-bearing D-grade dependency. Concrete worked example of the strategy-and-sequencing framework in `CLAUDE.md`.

The plan for retiring the load-bearing Anthropic dependency. Composes with the [audit entry](software-and-saas.book-chapter.md#anthropic) and the framework concepts in [trust-criterion.md](trust-criterion.book-chapter.md), [grading-scale.md](grading-scale.book-chapter.md), and [ranking-criterion.md](ranking-criterion.book-chapter.md).

## What

Migrate AI-as-skill-amplifier — Claude Code, the agent runtime, and household AI usage — off the Anthropic API and onto **local-compute open-weights inference** running on a Mac Studio with 512GB+ unified memory. Retire the four Anthropic Max subscriptions once local-compute is proven sufficient.

## Priority

**Highest among load-bearing D-grade dependencies.** Three reasons that compound:

1. **Load-bearing scope.** Anthropic is the multiplier on every other household skill — see [personal-context.md → Non-software skills](personal-context.book-chapter.md#non-software-skills). The criticality is wider than any single life-domain dependency because AI support is the lever that turns "decent amateur" capability into actionable capability across cooking, medical, financial, auto, home repair, gardening, textiles, and negotiation.
2. **Trust grade dropped this year.** The downgrade from B to D was driven by specific recent behaviors. Per [trust-criterion.md → recent behavior is highly diagnostic](trust-criterion.book-chapter.md#recent-behavior-is-highly-diagnostic), recency is the strongest signal the framework receives.
3. **Alternatives space is rapidly maturing.** Open-weights local inference, competing providers, and capability-sufficient smaller models have all crossed thresholds that make the migration feasible. The viability check in [alternatives.md](alternatives.book-chapter.md) lands cleanly — local-compute is the self-reliance tier and is genuinely available.

## Current cost

**Four Anthropic Max subscriptions at $215/month each = $860/month, $10,320/year.**

That number is the capital reallocation budget. Once the migration completes, the monthly outflow stops, and the capital can fund the hardware needed to replace it. The rough heuristic: the Mac Studio with 512GB+ memory is approximately a 12-month breakeven against the current subscription spend.

## Strategy — four steps, sequenced

The migration is **sequential with external waitstates**. Each step blocks on the previous; the first step blocks on Apple's product cadence and is outside my control.

### 1. Wait

Wait for Apple to refresh the Mac Studio with a 512GB+ memory configuration **available again**. Memory shortages have made the 512GB SKU unavailable; I cannot accelerate this. The blocker is Apple's product cadence plus the memory supply chain.

The right action during this phase is to **keep paying Anthropic and prepare**. Premature action — buying a less-capable Mac Studio, migrating to a different D-grade model provider, or attempting the household training before the hardware lands — does not improve my trust position and burns switching cost twice.

### 2. Buy

Buy the Mac Studio with 512GB+ memory once the SKU is available again. Capital outlay funded from the existing $10,320/year subscription budget. No additional outlay required — the migration is self-funding on the 12-month-ish horizon.

### 3. Test

Replace Anthropic Max usage with local-compute open-weights inference. Validate capability sufficiency across the actual household workloads:

- Claude Code workflows.
- The agent runtime that drives the development environment.
- Daily AI-as-skill-amplifier usage across the cooking / medical / financial / auto / home-repair / gardening / textiles / negotiation domains.

Testing is the gating step. The retirement decision in step 4 depends on the testing outcome being clean.

### 4. Retire

Retire the four Anthropic subscriptions once local-compute is proven sufficient. The four subscriptions retire **as a group** — partial retirement isn't useful because the testing window is the gating step, not the per-subscription decision.

## Why "wait" is the right move during the blocked window

Three reasons that all push the same direction.

**Premature migration doesn't improve the trust position.** Switching to a smaller Mac Studio, or to a different model provider that's also D-grade, leaves me on a load-bearing D-grade dependency. The whole point is to land on an option whose trust shape is meaningfully better — self-hosted open-weights is the structural answer.

**Switching costs are real.** Workflow disruption, household re-training on whatever the interim option is, and re-validation across every life-domain. Doing the migration twice is wasteful.

**A D-grade dependency is tolerable in the meantime.** Per [grading-scale.md → D](grading-scale.book-chapter.md#d--clear-misalignment-but-tolerable), the D band explicitly allows dependencies to persist when remediation strategy requires it. I see the problem; I am consciously accepting the cost of staying until the right move is available.

## Plan entry (per `CLAUDE.md → Anatomy`)

- **What.** Anthropic API — see [software-and-saas.md#anthropic](software-and-saas.book-chapter.md#anthropic).
- **Score.** High criticality × already-enshittifying × very-high switching cost. Top of the load-bearing D-grade queue.
- **Proposed alternative.** Self-reliance tier per [alternatives.md](alternatives.book-chapter.md) — local-compute open-weights inference on a Mac Studio with 512GB+ memory.
- **Cost.** Capital outlay roughly equal to one year of the current subscription spend ($10,320). No marginal monthly cost after capital outlay (electricity excluded). Time cost: testing and household re-training during steps 3-4.
- **Blocked by.** Apple Mac Studio refresh with a 512GB+ SKU available. External; no acceleration path.
- **Enables.** Retiring the load-bearing Anthropic dependency. Frees the $10,320/year subscription budget for the next-priority remediation.
- **Sequencing.** Step 1 is the standing state until the SKU returns. Steps 2-4 are immediate-and-sequential once unblocked. The four subscriptions retire as a group at the end of step 4, not progressively.
- **Rationale.** Self-hosted inference is the structural answer to the load-bearing-AI-dependency problem. Every alternative tier above it is itself a profit-pressured organization subject to the same enshittification cycle that produced the Anthropic downgrade. The self-reliance investment is what makes the trust grade actually improve rather than just shifting D-grade vendors.

## Sub-questions to develop in future cycles

- **Backup model-provider strategy** if Apple delays the Mac Studio refresh past a tolerable timeline. What does the contingency look like — is there a non-D-grade interim option, or does the wait simply extend?
- **Specific open-weights model evaluation methodology.** Which models to test, on which household workloads, with which success criteria. The capability-sufficiency check needs a concrete rubric before step 3.
- **Household training on local-compute workflows ahead of the migration.** Some of the re-training can happen during the wait phase — familiarity with the local-compute tooling reduces switching cost when the hardware lands.
