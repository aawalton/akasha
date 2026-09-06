
# Capture events

> Capture events — when a previously trusted organization undergoes a structural change (sale, acquisition, IPO, leadership shift), trust resets to zero. The new entity has to re-earn trust from scratch. The framework's defense against grandfathering prior track records into a different post-change organization.

The framework's handling of the case where a previously trusted organization stops being trustworthy. Composes directly with [trust-criterion.md](trust-criterion.book-chapter.md): trust is earned by demonstrated resistance under pressure, and when the entity demonstrating that resistance is replaced, the demonstration is no longer valid evidence about the new entity.

## The rule

**When a previously trusted organization has a capture event, trust resets to zero.**

The new entity must demonstrate resistance under pressure to re-earn trust from scratch. Prior track record is informational only after capture — it tells me what the old entity did, not what the new entity will do.

## What counts as a capture event

Any of the following resets trust. The list is conservative on purpose — false negatives on capture events (missing one) are cheaper than false positives on trust (continuing to depend on a captured organization).

- **Founder sale or retirement** → new ownership replaces the person whose values built the track record.
- **Acquisition by a larger organization** — especially private equity, but any acquisition counts. The acquirer's incentives become the new operating constraint.
- **IPO.** Shift from private to public. Introduces continuous shareholder pressure, which is exactly the pressure the trust criterion is meant to test against. The pre-IPO track record was demonstrated under different incentives.
- **Hostile takeover or activist-investor pressure** that materially shifts board composition or governance.
- **Leadership change.** New CEO, board reshuffle, or any change at the level that controls direction-setting. The old leadership's resistance under pressure was a property of those specific people.
- **Mission statement or governance-document change.** The organization is announcing publicly that its operating principles are different now. Take the announcement seriously.
- **Government services capture.** Regulatory body restructuring, change in elected leadership at the level controlling the service, or visible regulatory-capture episodes that change what the service actually delivers.

## Why reset to zero

Three reasons.

**The trust criterion is about the entity that demonstrated the resistance.** [trust-criterion.md → demonstrated resistance](trust-criterion.book-chapter.md#what-demonstrated-resistance-looks-like) names "resistance under pressure" as the only evidence that counts. That resistance was demonstrated by the *prior* entity — its leadership, its ownership structure, its governance. The new entity has demonstrated nothing under its own decision-making yet. Carrying prior evidence forward conflates the demonstrations.

**Conservative tilt.** False negatives on capture (missing one) cost me a dependence on an organization whose character has shifted. False positives on trust (resetting one that turns out to keep behaving well) cost me a few months of unnecessary scrutiny, which I can recover from. The cheaper failure mode is to over-reset.

**The current enshittification cycle is highly diagnostic on early decisions.** Per [trust-criterion.md → recent behavior is diagnostic](trust-criterion.book-chapter.md#recent-behavior-is-highly-diagnostic), the universal pressure on every organization right now means the new entity's first decisions under its own governance are unusually revealing and arrive quickly. Reset cost is small because re-evaluation is fast.

## Detection — current state

All-reactive. I notice when service quality degrades, then investigate ownership / leadership / governance history.

Active monitoring across every audited dependency is too expensive to do manually given the burnout-recovery bandwidth ceiling documented in [personal-context.md → Household](personal-context.book-chapter.md#household--five-members-all-audhd). The audit will surface the load-bearing dependencies; reactive monitoring is targeted at degradation signals on those specifically.

## Detection — planned future capability

The right structural answer is an AI monitoring service that tracks capture events across every audited dependency on a regular schedule. Cron-scheduled ingest of news + regulatory filings + governance documents per entity, flag candidate capture-event indicators, surface them to me for re-evaluation against the trust criterion.

This is itself a self-reliance investment. Depending on an external alerting service would just push the trust problem one layer up — that service would be subject to the same enshittification pressure as every other large org. Building the monitoring myself keeps the dependency stack short. Lands as a plan-tier remediation item in `/abby`'s backlog, not as a framework concept.

## Edge cases worth flagging

Open questions, not resolved here.

### Mission-aligned successor

A founder sells to a co-op, an employee-ownership trust, or a mission-driven foundation that is structurally aligned with what made the organization worth trusting. The capture-event rule still resets trust — the entity making decisions is different. But the practical scrutiny period is shorter when the structural alignment is observable, because the new governance constraints are themselves evidence about what the new entity is incentivized to do.

Open question: how short. Tentative answer is "scale the re-evaluation period to the strength of the structural insulation evidence", but no clean rule yet.

### Gradual board drift

No single triggering event, but board composition shifts substantially over years. Treat each individual board change as a capture-event trigger — that keeps the framework conservative without needing a "cumulative drift" detector that I don't have a clean threshold for.

### Government-services capture

Hard to detect because the "event" is often slow regulatory capture rather than a discrete transaction. There is no obvious moment like a sale or an IPO. The signal is usually a change in what the service actually delivers, observed retrospectively.

Practical handling: treat any change in the elected leadership controlling a service as a capture-event trigger, and treat visible regulatory-capture episodes (revolving-door appointments, rule rollbacks favoring regulated industries) as additional triggers. The detection lag is real and the framework should expect to be reactive on this category.

## Applications

- [trust-criterion.md](trust-criterion.book-chapter.md) — the rule that capture events reset trust composes with the trust criterion's definition of how trust is earned. This file is the "what happens when the entity demonstrating trust changes" complement.
- The audit — every audited dependency carries an implicit capture-event watch. Reactive for now; AI-monitored in the remediation plan.
- The plan — proposes the AI monitoring service as a plan item, and treats already-captured dependencies as highest-priority remediation candidates.

