
# Software and SaaS

> Software and SaaS audit — inventory of every recurring software dependency I currently rely on, with a trust grade per `grading-scale.md`. Surfaces the behavior-over-structure pattern (Anthropic), concentration-is-not-trust (Cloudflare), capture-by-acquisition (Mint Mobile), and email-as-identity-recovery-anchor (Gmail).

Every SaaS and recurring software dependency I currently lean on. Grades per [grading-scale.md](grading-scale.book-chapter.md). The grade is **behavior over structure** — what the organization has actually done recently, not what its governance documents promise. Concentration is **not** a trust factor; it lands in the plan as a criticality multiplier per [ranking-criterion.md](ranking-criterion.book-chapter.md), not in the trust grade.

## Inventory

### Load-bearing infrastructure SaaS (no self-hosted analog)

#### Cloudflare

- **Service.** Four distinct roles bundled at one vendor: domain registrar (alanwalton.com, tempereso.com, audhdalan.com), authoritative DNS, public ingress via Cloudflare Tunnel, and ACME DNS-01 validation channel for Let's Encrypt certificate issuance.
- **Grade.** **B.**
- **Reservations.** Long-term concerns. Leadership has been ideologically inconsistent under pressure — stood firm in some politically-charged incidents, folded in others. Currently better than peers in the public-internet-infrastructure space at focusing on value-delivery rather than extraction, which is why the grade lands at B rather than C, but the long-term trajectory is uncertain.
- **Criticality.** Load-bearing. The four roles touch every public hostname I run.
- **Notes.** Single-vendor concentration across registrar + DNS + Tunnel + ACME is a real problem, but it is a **plan-level criticality concern, not a trust-grade concern.** The grade is about Cloudflare-the-organization; the concentration is about my dependency graph. The Cloudflare concentrated-risk remediation strategy already in the plan queue is the right home for that conversation.

#### Let's Encrypt (ISRG)

- **Service.** TLS certificate issuance via DNS-01 ACME, automated against Cloudflare DNS.
- **Grade.** **B.**
- **Reservations.** Structurally tied to the public CA trust system — that's a system-level concern, not a Let's-Encrypt-specific one. The organization itself is a long-stable nonprofit (Internet Security Research Group) with no current bad acts and a clear public mission.
- **Criticality.** Load-bearing. Every TLS certificate I serve flows through here.
- **Notes.** The reservation that keeps it at B rather than A is the dependency on the broader CA trust system, which is itself capturable in ways no single CA can defend against.

#### Anthropic

- **Service.** Claude API for Claude Code, the agent runtime that drives most of my development work, and AI-as-skill-amplifier across the household (cooking, medical, financial, auto, home repair, gardening, textiles, negotiation — see [personal-context.md](personal-context.book-chapter.md)).
- **Grade.** **D.** Downgraded from B earlier this year.
- **Reservations — specific behaviors that drove the downgrade.**
  1. **Silent service degradation without communication.** Paying customers received a materially downgraded experience without disclosure. Textbook enshittification: extracting from paying users while withholding the information that would let them make an informed decision about staying.
  2. **Target-selection use in the Iran strikes that killed civilians, including 120 children.** Anthropic publicly committed to no autonomous-killing-drone use of Claude, then allowed Claude to be used for target selection in strikes that killed civilians at scale. Mission betrayal at the highest stakes — failed the "demonstrated resistance under pressure" test ([trust-criterion.md → demonstrated resistance](trust-criterion.book-chapter.md#what-demonstrated-resistance-looks-like)) on the single most-publicized ethical commitment the company had made.
- **Criticality.** Load-bearing for AI-as-skill-amplifier. Failure mode is graceful-degradation back to baseline amateur skill levels by domain, but the degradation is large.
- **Notes.** Canonical worked example of **behavior over structure**. Anthropic carries every structural alignment signal the framework values — PBC governance, Long-Term Benefit Trust, an explicit public safety mission, the marketing posture of an aligned actor. None of it prevented the behaviors above. The structural signals are informational; the behavior is dispositive. Cross-link this entry from [grading-scale.md](grading-scale.book-chapter.md) when the framework note next gets revised — this is the clearest demonstration the audit has produced so far.

#### Monarch Money

- **Service.** Personal finance aggregation across accounts.
- **Grade.** **C.**
- **Reservations.** Not actively bad. Young startup with no strong alignment signal in either direction. Specific concerns: stability (typical startup financials, no obvious path to durable independence) and the likely-to-enshittify trajectory that startups in this category have repeatedly followed.
- **Criticality.** Medium. Convenience aggregation; replaceable but the data continuity matters.
- **Notes.** Default C — the absence of evidence in either direction. Worth watching for capture-event signals per [capture-events.md](capture-events.book-chapter.md).

### Load-bearing personal-use SaaS

#### Gmail (Google)

- **Service.** Primary email plus — critically — the identity-recovery anchor for most other accounts I hold. Password resets for the majority of my online presence terminate at this inbox.
- **Grade.** **D.**
- **Reservations.** Google as parent organization. The grade is on Google's behavior overall, not on Gmail-the-product.
- **Criticality.** Life-critical, indirectly. Loss of Gmail control cascades into authentication-recovery failure on a long tail of downstream accounts.
- **Notes.** Email-as-identity-recovery-anchor is its own framework concept — the cascading-dependency pattern where one account's control determines authentication-recovery for a downstream cluster. The framework home is [identity-recovery-anchor.md](identity-recovery-anchor.book-chapter.md), including the OAuth-login vs recovery-anchor split (OAuth = accept bucket, no viable alternative; recovery = the part to replace and potentially self-host).

#### Google Drive (Google)

- **Service.** Household cloud storage, consolidated.
- **Grade.** **D.** Same parent.
- **Criticality.** High. Disruption is significant; not immediately life-critical but the data continuity matters.
- **Notes.** Same migration plan as Gmail — touching one Google service while staying on another doesn't solve the parent-organization problem.

#### Mint Mobile

- **Service.** Cellular carrier for 5 phones (household of 5).
- **Grade.** **D.**
- **Reservations.** Single-vendor concentration for household communications. **T-Mobile's acquisition of Mint Mobile closed in 2024** — that is a textbook capture event per [capture-events.md](capture-events.book-chapter.md). Trust resets to zero on the acquisition; the D grade is already reflective of the new parent.
- **Criticality.** Life-critical. Five-person household communications.
- **Notes.** Concrete demonstration of the capture-event rule. The pre-acquisition Mint Mobile track record is informational only — it tells me what the old entity did, not what T-Mobile will do with the asset.

### Convenience streaming / media SaaS

All four are D-grade convenience subscriptions. Not life-critical; remediation priority is low.

- **Netflix** — **D.**
- **Disney+** — **D.**
- **Crunchyroll (Sony-owned)** — **D.**
- **YouTube Premium (Google)** — **D.**

### Productivity / personal-tools

#### 1Password

- **Service.** Household password management.
- **Grade.** **C.**
- **Reservations.** Not actively bad so far. Single-vendor password management is **high-criticality** — a compromise has an enormous blast radius. The grade reflects stability concerns and future enshittification potential, not current behavior.
- **Criticality.** Life-critical. Compromise or loss-of-access cascades into authentication-recovery failure across every account.
- **Notes.** Watch. The combination of high criticality and no current alternative makes this a high-priority audit item even at C.

### Convenience SaaS already in cycle-2 inventory (low stakes, not graded individually here)

GitHub (mirror only — primary git is self-hosted), ScraperAPI (Kindle library scraping), Spotify API (music collection sync), Trakt API (shows collection sync), Notion (collections write target).

All convenience-tier with low exposure; no urgent need to grade individually right now. Worth flagging that several have ownership concerns — Trakt sold to a private-equity-adjacent owner, Notion has had recent funding rounds and pricing changes, ScraperAPI is a profit-driven startup. Land as "convenience, watch."

## Framework patterns surfaced from this audit

- **Behavior over structure.** Anthropic's downgrade is the cleanest worked example the audit has produced. PBC governance, Long-Term Benefit Trust, and a public safety mission did not prevent silent service degradation or the Iran-strikes target-selection use. The grade follows behavior, not the governance documents. Cross-link from [grading-scale.md](grading-scale.book-chapter.md) next revision.
- **Concentration is not a trust factor.** Cloudflare's B grade is independent of how concentrated my Cloudflare dependency is. Concentration affects criticality in the plan-stage ranking per [ranking-criterion.md](ranking-criterion.book-chapter.md), not the trust grade itself. The grade is about the organization; the concentration is about my dependency graph.
- **Capture event by acquisition.** Mint Mobile's T-Mobile acquisition triggers the capture-event rule per [capture-events.md](capture-events.book-chapter.md). Trust resets to zero. The D grade already reflects the new ownership rather than the pre-acquisition track record.
- **Email as identity-recovery anchor.** Gmail's D status carries downstream risk because email controls password resets for most other accounts. The cascading-dependency shape — one account's control determines authentication-recovery for a downstream cluster — is its own framework concept, now in [identity-recovery-anchor.md](identity-recovery-anchor.book-chapter.md) (with the OAuth-login vs recovery-anchor split).

## Open audit gaps (flag for future cycles)

- **Convenience-tier SaaS not individually graded** — GitHub mirror, ScraperAPI, Spotify API, Trakt, Notion. Low priority; land when the cycle gets to them.
- **Productivity tools beyond 1Password** — calendar / contacts vendor, note-taking, design tools, code editor licenses if any. Not yet inventoried.
- **Domain registrar concentration** at Cloudflare is captured at the plan level via the existing "Cloudflare concentrated-risk remediation strategy" item, not duplicated here.
