
# Banking

> Banking audit — inventory of every financial institution I currently depend on, with a trust grade and notes. First domain audit; applies the framework as it currently stands (see grading-scale.md and ranking-criterion.md). Surfaces several reusable framework patterns — mortgage-servicer structural lock-in, cascading dependencies, stability-as-trust.

Every financial institution I currently depend on. Grades per [grading-scale.md](grading-scale.book-chapter.md). Component decomposition and definitions of the trust dimensions are in that file; this audit applies the grades and records the reservations behind each one.

## Inventory

### Vanguard

- **Service.** Retirement plus Roth IRA. Holds ~$1.7M in liquid stock; an older snapshot put this 100% in VTIAX (Vanguard Total International Stock Index), but that custodian/single-fund absolute is [no longer currently affirmed](personal-context.book-chapter.md#income) — treat the Vanguard/VTIAX allocation as unconfirmed pending re-statement.
- **Grade.** **B.**
- **Reservations.** Recent service-quality complaints — an early enshittification signal worth re-evaluating against [trust-criterion.md](trust-criterion.book-chapter.md). Mutual ownership structure is strong but worth watching for governance drift.
- **Criticality.** Load-bearing for retirement income.
- **Notes.** The portfolio-concentration question — 100% international equity, 100% one fund (VTIAX), 100% one institution (Vanguard) — is a separate concern from the Vanguard-trust assessment. The concentration belongs in the plan as a portfolio-design intervention; the institutional-trust grade is just about Vanguard the organization. Full concentration discussion in [personal-context.md](personal-context.book-chapter.md).

### Citi

- **Service.** Checking account plus the Costco credit card (Citi is Costco's exclusive cobrand partner).
- **Grade.** **D.**
- **Reservations.** Large publicly-traded bank, 2008 bailout history, sustained consumer-fines history. Structurally exposed to shareholder pressure by virtue of being publicly traded.
- **Criticality.** Primary checking — load-bearing for day-to-day operations.
- **Notes.** Currently running a research pass on the six largest US banks (JPMorgan Chase, Bank of America, Citi, Wells Fargo, Goldman Sachs, Morgan Stanley) to find one rated higher than D. Methodology lives in [grading-scale.md](grading-scale.book-chapter.md) and is in flux — the three-dimension scoring (financial resiliency, ethics, political ideology) is a first draft and the score-to-grade mapping is not yet rigorous.

### UCCU (University Federal Credit Union, Provo)

- **Service.** Two distinct uses:
  - Legacy savings accounts for SSDI-relatives who can't hold assets directly. Load-bearing for those relatives' benefits eligibility.
  - Small extended-family trust (~$5k) collecting royalties from my father's books, jointly held with my four siblings.
- **Grade.** **D.**
- **Reservations.** Small-bank stability concerns post-SVB experience. Member-ownership alignment is strong on its own merits but doesn't offset the stability reservation — per [trust-criterion.md → stability is part of trust](trust-criterion.book-chapter.md#stability-is-part-of-trust-not-a-separate-axis), stability concerns land directly on the trust dimension and can drag the grade by themselves.
- **Criticality.** Indirectly load-bearing — benefits eligibility for SSDI-relatives depends on the account structure here.

### Chase

- **Service.** Sapphire travel credit card.
- **Grade.** **D.**
- **Reservations.** Largest US bank, consumer-fines history, publicly traded with shareholder pressure.
- **Criticality.** Convenience tier — losing the card is recoverable. Exit is feasible.

### Synchrony

- **Service.** Amazon Store credit card.
- **Grade.** **D.**
- **Reservations.** Publicly-traded consumer-finance issuer, profit-driven cobrand structure (cobrand cards are an enshittification-prone product line by design).
- **Criticality.** Convenience tier. Exit is feasible.

### BSI Financial Services

- **Service.** Mortgage servicer for the ~$500k home mortgage.
- **Grade.** **D.**
- **Reservations.** Reservations partly moot — the mortgage-servicer relationship is structurally locked-in. The originator sold the paper to BSI; I didn't choose BSI as my counterparty. The trust grade documents the concern, but the relationship is determined by who holds the paper, not by my choice.
- **Criticality.** Load-bearing for the housing dependency, but the dependency runs the other direction — BSI depends on me paying, more than I depend on BSI specifically. Servicer swaps are routine.

### Venmo (PayPal Holdings)

- **Service.** Peer-to-peer payments. Used consistently for Facebook Marketplace buying and selling; other P2P apps used only when forced.
- **Grade.** **D.**
- **Reservations.** Publicly-traded large payments-processor, profit-pressure exposure, standard enshittification trajectory for a category leader.
- **Criticality.** Convenience tier on its own.
- **Notes.** Cascading dependency. The Venmo need is downstream of the Facebook Marketplace need — if Marketplace exits the dependency graph, the Venmo need shrinks proportionally. Worth recording because the audit ranking should look at the upstream node (Marketplace), not just the downstream one (Venmo).

### TurboTax (Intuit)

- **Service.** Annual tax preparation.
- **Grade.** **D.**
- **Reservations.** Intuit's sustained lobbying record blocking IRS free-file, plus the dark-pattern complaints history.
- **Criticality.** Low — under $100 and roughly 30 minutes per year.
- **Notes.** Not urgent to exit despite the grade. Concrete instance of the "D-tier dependency I am consciously accepting the cost of staying with" pattern from [grading-scale.md → D](grading-scale.book-chapter.md#d--clear-misalignment-but-tolerable). Cost of staying is small; switching cost is comparable or larger; the grade documents the concern without forcing immediate action.

## Open audit gaps

- **Large-bank research pass.** In progress. The six-largest-banks scoring may yield a B-tier candidate to migrate primary checking to. Outcome feeds back into the Citi entry above.
- **Costco / Citi cobrand entanglement.** The Costco credit card requires Citi as the issuer (Citi is Costco's exclusive cobrand partner). This is a cascading dependency — Costco-membership-trust (B) creates Citi-card-trust dependency (D). Untangling requires either rejecting the Costco card (and losing the cashback structure) or accepting the Citi card as the cost of the Costco relationship. Decision deferred to the plan stage.

## Framework illustrations surfaced from this audit

Patterns this audit produced that the framework should record (or already records) for use across other domains:

- **Mortgage servicer = structural lock-in.** The BSI relationship illustrates that I don't choose my servicer. The originator can sell the paper to whoever they want, and the new servicer becomes my counterparty without my consent. Generalizable to any financial product where the relationship can be transferred to a third party without the customer's involvement. Worth elevating to a framework note in a future cycle.
- **Cascading dependencies.** Two visible in this audit alone: Facebook Marketplace → Venmo, and Costco → Citi. The downstream dependency cannot be evaluated in isolation; its real weight depends on the upstream dependency that creates the need for it. The ranking criterion as written treats each dependency separately ([ranking-criterion.md → not cascading-aware](ranking-criterion.book-chapter.md#what-this-criterion-does-not-do) flags this as a known gap). The cascading mechanism is flagged for a later framework refinement.
- **Stability as a component of trust.** UCCU's drop to D, driven by stability concerns alone despite strong ethics and ownership alignment, is the concrete demonstration of the rule in [trust-criterion.md → stability is part of trust](trust-criterion.book-chapter.md#stability-is-part-of-trust-not-a-separate-axis). The audit confirms the framing — when I look at UCCU I really do trust them less because I worry they might not survive, and that distrust composes naturally with the trust dimension rather than living in a separate axis.
