
# Audit scope

> What counts as a dependency for the audit — broad inclusion. Any ongoing relationship with meaningful switching cost, and explicitly including invisible constraints whose alternatives feel inaccessible.

What counts as a dependency for the audit. The rule deliberately casts a wide net.

## Definition

A dependency, for audit purposes, is **any ongoing relationship with a large organization that has meaningful switching cost.** The relationship can be paid or free; the organization can be corporate or governmental; the dependency can be visible or invisible. If switching out of the relationship would impose meaningful cost in money, time, learning, or coordination, it counts.

The scope is intentionally broad. Narrowing the audit too early would let the most important dependencies hide.

## Visible dependencies — the obvious bucket

The standard categories:

- **Subscriptions** — streaming, software, recurring services.
- **Banking and financial** — checking, savings, brokerage, credit cards, loans.
- **Utilities** — electric, gas, water, sewer, trash.
- **Healthcare** — insurance, providers, pharmacy.
- **Insurance beyond health** — auto, home, life, liability.
- **Communications** — ISP, mobile carrier, email provider.
- **Transportation** — vehicle, fuel, insurance, transit.
- **Employers and clients** — income source(s).
- **Government services** — tax, identity, postal, regulatory.
- **Software and SaaS** — productivity tools, cloud services, development infrastructure.
- **Regular retailers** — groceries, household goods sources I return to predictably.
- **Regular service providers** — barber, mechanic, dentist, etc.

The audit has a file per visible category.

## Invisible constraints — the load-bearing bucket

This is the part the framework cares about most.

An **invisible constraint** is a dependency that feels inescapable because the alternative is so expensive it has never been seriously evaluated.

Canonical example: **paying property taxes**. The alternative is moving to a different jurisdiction (or buying property without taxes, which mostly doesn't exist in any developed country). The cost of the alternative is so high that the dependency stops feeling like a dependency at all — it feels like a fact of life.

But it is a dependency. The municipal / county / state government is a large organization. It collects ongoing money from me. It is subject to enshittification pressure under [enshittification.md](enshittification.book-chapter.md) as much as any corporation. Treating it as a fact of life rather than a dependency means the framework can never see its risk-adjusted exposure.

### Other invisible-constraint examples

- **Citizenship and legal residency.** The state you are a citizen of has near-total control over your ability to live and work. Switching costs are extreme. The dependency is total.
- **Jurisdictional law as a whole.** The legal system you operate under shapes contracts, property, employment, marriage, inheritance. Alternative is emigration. Cost is enormous.
- **Currency.** Your savings, your income, and your daily transactions all sit in a currency whose value is set by a single central bank. Alternative is diversification into other currencies, hard assets, or capability — none are free.
- **The electrical grid.** Treated as a fact of life by most people. Solar+battery has made it a real option for the first time in decades. The grid is still a dependency.
- **The financial system as a whole.** Bank accounts, payment rails, credit reporting. Alternative is cash + local barter + capability — limited and lossy, but possible.
- **The healthcare system.** Treated as inescapable because the alternative (out-of-system care, self-care, going-without) is brutal. But the dependency is real and the alternatives are real even when brutal.

### Why invisible constraints belong in the audit

Two reasons:

1. **The alternatives are real, even if expensive.** Including them makes them visible as strategic options. Moving jurisdictions is a real lever, even if it's an expensive one. Solar+battery is a real lever, even if the capital cost is high. Building capability — self-reliance per [alternatives.md](alternatives.book-chapter.md) — is a real lever in every category. Until the invisible constraint is in the audit, none of these levers can be evaluated against each other.
2. **The same enshittification pressure applies.** A jurisdiction that has been steadily worsening for me (higher taxes, more invasive regulation, less reliable services) is enshittifying in the same shape as a corporation. The framework needs to see it. The trust criterion applies to the jurisdiction the same way it applies to Costco or Walmart.

The cost of including invisible constraints in the audit is small (a few extra files). The cost of excluding them is structural — the framework becomes blind to the highest-leverage strategic moves available.

## What does **not** count as a dependency

The line where the audit stops:

- **One-time transactions.** A single purchase from a vendor I won't repeat. Not an ongoing relationship.
- **Trivial recurring purchases without switching cost.** Buying gum at whatever store happens to be nearby. The relationship is so loose that switching is free.
- **Relationships with individuals.** Friends, family, individual contractors. The framework is about large organizations under profit pressure; individuals operate under different dynamics and need a different lens.

The third exclusion has edge cases — a sole proprietor I depend on heavily (my doctor, my accountant) is closer to an individual than to a large organization, but the dependency shape is similar. For v1 I lean toward including these and flag the boundary as something to refine.

## Granularity

One file per life-domain in the audit. Within a file, each specific dependency gets its own section. So [banking.md](banking.book-chapter.md) has sections for each of my actual accounts; [healthcare.md](healthcare.book-chapter.md) has sections for insurer, providers, pharmacy. Recursive split rule applies — when a domain file gets too dense, split into sub-files.

## Applications

- The audit — every file in it is governed by this scope rule.
- [ranking-criterion.md](ranking-criterion.book-chapter.md) — the audit is the input the ranking criterion sorts.
- [alternatives.md](alternatives.book-chapter.md) — the alternatives taxonomy is what makes invisible-constraint inclusion useful, because it surfaces the strategic options that a narrower audit scope would hide.
