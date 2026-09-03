
# Alternatives

> The alternatives space — self-reliance is a first-class alternative alongside switching to trustworthy organizations. The reframe converts a dependency from "ongoing relationship" to "one-time capability acquisition" wherever the capability is buildable.

The taxonomy of what I can switch to once an audit item lands at the top of the queue via [ranking-criterion.md](ranking-criterion.book-chapter.md).

## The point

For a long time the default frame was "find a better organization." That frame quietly assumes the answer to every dependency is another ongoing relationship. It isn't. Self-reliance — building the capability to provide the service to myself — is a first-class alternative, ranked alongside the trustworthy-organization alternatives, not below them.

The reframe is the substantive move:

- **Old frame.** "Which organization do I trust to provide X over the next decades?"
- **New frame.** "What is the lowest-risk way to obtain X? Trustworthy organization, smaller organization, co-op, self-reliance, or some mix?"

The new frame turns a dependency from an **ongoing relationship I have to keep evaluating** into a **one-time capability acquisition I can amortize over years**, whenever self-reliance is buildable.

## The taxonomy

In rough order from highest-residual-trust-burden to lowest:

### 1. Trustworthy larger organizations

Costco-tier. Organizations that have earned trust under [trust-criterion.md](trust-criterion.book-chapter.md). Decades of duration plus demonstrated resistance under pressure.

The simplest alternative when one exists. The trade is one ongoing relationship for another, but the new relationship is one that has actually been tested.

Inventory of candidates lives in the audit and plan stages — not enumerated here.

### 2. Smaller / local organizations

Local businesses, regional providers, small chains. The mechanism that protects them from enshittification is different from the trustworthy-large-org case — they often lack the scale that creates platform-style capture in the first place, and they tend to be more responsive to local pressure.

Trade-off: less institutional durability. A small organization can disappear quickly. Useful when the dependency tolerates substitution (one local shop is replaceable by another) but riskier when continuity matters.

### 3. Co-ops, mutuals, and member-owned organizations

Structurally insulated from profit pressure. REI (member-owned co-op), USAA (mutual insurance — members are owners), credit unions (member-owned), electric co-ops in rural areas. The owners are the customers, so the profit-extraction-from-customers loop is structurally weaker.

Not immune — co-ops can still drift, leadership can still capture them, governance can still fail. But the structural starting position is better than a for-profit corporation under the same pressure.

The trust criterion as written assumes profit-pressured organizations. For co-ops and mutuals, the duration condition may relax — the structural insulation does some of the work that "decades of demonstrated resistance" does for a corporation. Open question for a later cycle; flagged in [trust-criterion.md](trust-criterion.book-chapter.md).

### 4. Self-reliance

Building the capability to provide the service to myself. The first-class alternative.

Examples:

- **Solar + battery** — eliminates the dependence on the electrical grid for daily operation.
- **Home garden / food storage** — reduces dependence on grocery retailers for staple food.
- **Owning toolsets and learning to repair** — replaces dependence on repair services and replacement-purchase cycles.
- **Self-hosted services** — replaces dependence on SaaS providers for software I rely on.
- **Capability-building generally** — every skill I learn that replaces a service I would otherwise have bought.

The cost shape is different from organizational alternatives:

- **Up-front capital and learning.** Higher than switching organizations.
- **Recurring cost over time.** Lower — often near zero except for maintenance.
- **Trust burden.** Eliminated. There is no organization to evaluate.
- **Cascading dependency surface.** Shrunk — the dependencies I do retain are simpler (the equipment supplier, the materials supplier) and switchable.

Self-reliance is not always available and not always cheaper. The audit + plan judges per-item.

#### Self-reliance as not-needing

A fifth path within the self-reliance category, distinct from the capability-building cases above. For some dependencies, the highest-leverage remediation isn't switching to a different vendor and isn't building the capability to provide the service to myself — it's eliminating the underlying need.

The reframe again:

- **Old self-reliance frame.** "Can I provide this service to myself?"
- **Not-needing frame.** "Do I need this service at all? Can I change my situation so the need disappears?"

When the need can be eliminated, the dependency is gone — not switched, not self-hosted, not diversified. There is no organization to evaluate, no capability to maintain, no recurring cost in money or trust burden. It is the cleanest exit from the threat surface for the categories it covers.

Concrete examples:

- **Medication-independence.** For some prescriptions, the right move is not "find a backup pharmacy" or "stockpile" — it's lifestyle work (sleep, nutrition, coping-skill development) that reduces the medication need to zero. See [healthcare.md → strategy](healthcare.book-chapter.md#strategy--medication-independence-direction) for the first concrete worked example.
- **Reduce information consumption.** Instead of switching from one social platform to another, drop the social-platform dependency entirely. The need was discretionary in the first place.
- **Reduce convenience purchases.** Instead of finding a B-grade vendor for a convenience good, eliminate the need — cook at home rather than find a trustworthy restaurant chain; mend a garment rather than find a trustworthy clothing brand; walk or bike rather than find a trustworthy rideshare service.

The not-needing path is also available as a **meta-strategy across the rest of the taxonomy.** For any dependency, before walking the tiers from trustworthy-large-org down to government-as-utility, the first question is whether the need is real or discretionary. A discretionary need that gets eliminated outranks every other tier in cost, in trust burden, and in residual threat surface.

Limits: not every need is discretionary. A four-person household needs food; that need isn't going away. A diabetic needs insulin; that need isn't going away. Not-needing applies where the need is contingent on lifestyle, habit, expectation, or convenience — and the audit + plan judges per-item whether contingent is the right read.

### 5. Decentralized / p2p / federated

Self-hosted email + IMAP, mesh networks, p2p commerce, federated social networks, distributed storage. The system is no organization, just a protocol with many participants. Trust is distributed rather than placed in any single actor.

Trade-off: usability, ecosystem maturity, and discoverability are usually worse than centralized alternatives. The right move when the dependency is significant enough to justify the friction (email, key software infrastructure) and the centralized alternatives are visibly enshittifying.

### 6. Government-as-utility

Public services that historically operated outside profit pressure — the postal service, public libraries, public broadcasting, public schools, certain public health services. Long history of providing services that the private sector would not provide on commercially attractive terms.

Important caveat: these are themselves under capture pressure now. Government services that used to be reliably outside profit pressure are no longer reliably outside it (per [thesis.md → corporate capture](thesis.book-chapter.md#what-the-thesis-claims) — point 3). The same trust criterion has to apply. Some public services remain Costco-tier; some are visibly enshittifying. The framework treats each as a candidate, not a default.

## Picking an alternative

Given an audit item ranked high by [ranking-criterion.md](ranking-criterion.book-chapter.md), the picker walks the taxonomy top-to-bottom against the **viability** of each candidate. Viability lives in [audit-scope.md → invisible constraints](audit-scope.book-chapter.md#invisible-constraints--the-load-bearing-bucket) (the framework recognizes alternatives that look inaccessible at first as still being real options) but the viability criteria themselves are deferred to a later cycle — flagged in `/abby`'s backlog.

Default mix: when the criticality is high and the switching cost is high, layer alternatives — switch to a trustworthy organization for the immediate gap, build self-reliance for the medium-term, keep awareness of the decentralized option as insurance against the trustworthy organization itself failing the test later.

## Why this reframe matters

Three reasons:

1. **It surfaces strategic moves the old frame couldn't see.** Solar + battery, home gardening, self-hosting — these are not "alternative providers." They are capability acquisitions that exit the framework's threat surface entirely for the categories they cover.
2. **It changes the cost math.** Self-reliance has up-front cost and minimal recurring cost. An ongoing organizational relationship has low up-front cost and significant recurring cost (in money, in trust burden, in re-evaluation overhead). Over a long horizon, self-reliance is often cheaper. The old frame buried this.
3. **It is the only alternative that compounds.** Every capability I build reduces the threat surface for more than one dependency. A garden reduces grocery dependence; tool ownership reduces both repair-service and replacement-purchase dependence; self-hosting reduces multiple SaaS dependencies at once. Organizational switching is one-to-one; capability acquisition is one-to-many.

## Applications

- The plan walks this taxonomy for each top-of-queue audit item.
- Self-reliance candidates surface as pending threads in `/abby`'s backlog once the relevant audit domains are populated.
