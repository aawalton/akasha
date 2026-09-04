
# Government services

> Government-services audit — every federal, state, county, and city dependency I currently lean on, with a trust grade per `grading-scale.md`. Surfaces the pseudo-F grade for involuntary dependencies, the mandatory-vs-invisible-constraint distinction, and the observation that B-grade outliers cluster around structurally-intentionally-aligned dependencies inside misaligned sectors.

Every government-side dependency I currently lean on — federal, state (Utah), county (Utah County), city (Provo). Grades per [grading-scale.md](grading-scale.book-chapter.md). One section per dependency; the strategy section frames the constraint that most federal dependencies have no exit at all, and the framework patterns section lands the pseudo-F grade for involuntary dependencies plus the mandatory-vs-invisible-constraint distinction.

## Inventory

### Federal

#### IRS — federal income tax

- **Grade.** **D** (would be F if toleration were voluntary).
- **Reservations.** Extensive enshittification of taxpayer services — deliberate friction maintained to protect the TurboTax / H&R Block lobby, decades of underfunding, recent politicization signals on enforcement priorities and audit targeting. The behavior earns F; the D rating reflects that the exit option (expatriation, with partial obligations remaining) is expensive-but-real rather than nonexistent.
- **Criticality.** Total. Mandatory federal dependency. Non-compliance has criminal exposure.
- **Notes.** D-with-F-disposition — distinct from the pseudo-F category below. The exit exists, just at a price I'm not currently willing to pay.

#### USPS

- **Grade.** **C.**
- **Reservations.** Government-as-utility default. Long-running mission-aligned service. The DeJoy-era operational changes and the ongoing political pressure to privatize are yellow flags worth tracking, but no current capture event has fired.
- **Criticality.** Medium. Substitutable for most use cases (FedEx, UPS) at higher cost, non-substitutable for some (legally-required service, Last Mile delivery to remote addresses).

#### Selective Service

- **Grade.** **pseudo-F.**
- **Reservations.** The institutional structure exists only to enable conscription. Mandatory for males 18-25 regardless of consent, values, or conscientious objection. No accommodation for objection at registration time. Behavior earns F.
- **Why pseudo rather than full F.** **Toleration is not voluntary.** There is no exit mechanism at all — even expatriation doesn't undo prior registration obligation. The standard F prescription is "exit ASAP regardless of switching cost," which is unactionable when no exit exists. See the framework-patterns section below.
- **Criticality.** Total. Already-registered dependency for Alan; Joseph faces mandatory registration at 18.

#### Passport / State Department

- **Grade.** **D.**
- **Reservations.** Required for international travel. Concrete concerns: denial of passports based on perceived political alignment, opaque appeals process, fee escalation without oversight, processing backlog used as a political pressure tool. The dependency is total during international travel windows.
- **Criticality.** Medium-to-high — load-bearing during international travel; dormant otherwise.

#### Social Security Administration

Not graded individually in this cycle. **Flag for a future cycle.** The SSDI rule compliance for the legacy UCCU savings accounts (which exist precisely to keep household assets off the SSDI-receiving relatives' books per [banking.md](banking.book-chapter.md)) is a load-bearing detail that hasn't been captured in detail yet. The SSDI-side dependency cascades into the household's financial structure.

### State (Utah)

#### DMV — driver's license, vehicle registration

- **Grade.** **D.**
- **Reservations.** Standard government-friction default — opaque process, fees that escalate, queues used as a political tool when state-level priorities shift. No state-level alternative.
- **Criticality.** Load-bearing for vehicle operation.

#### Utah state income tax

- **Grade.** **D.**
- **Reservations.** Flat-rate (~4.85%) is relatively benign compared to other states. Still a mandatory dependency on Utah-state political stability plus the same state-level enshittification dynamic the IRS demonstrates at federal scale.
- **Criticality.** Total within Utah residency. Exit option is moving states, which has its own non-tax costs.

#### Homeschool registration — Utah State Board of Education

- **Grade.** **B.**
- **Reservations.** Utah's homeschool law is structurally friendly — annual notice of intent suffices, no curriculum approval, no testing requirement, no formal qualification of parents. Light administrative burden, state respects the choice. The one B-grade government service in the inventory.
- **Criticality.** **Load-bearing for the household's education strategy.** The kids' alternative-to-conventional-school path depends on Utah continuing to honor its homeschool framework.
- **Notes.** Risk to monitor: changes in Utah state law that could erode the homeschool-friendly structure. Same individual-vs-institutional-shape concern as Dr. Robinson inside Grandview — the B grade depends on the current state legislative posture, not on any structural insulation against future capture.

#### Fishing / hunting / outdoor licenses

**N/A.** Not used.

### County (Utah County)

#### Utah County property tax

- **Grade.** **D.**
- **Reservations.** Mandatory while the home is owned. Assessor process is opaque (informal market-comp methodology, appeals friction). The canonical **invisible-constraint** example from [audit-scope.md → invisible constraints](audit-scope.book-chapter.md#invisible-constraints--the-load-bearing-bucket).
- **Criticality.** Total while the home is owned. Exit requires either moving jurisdictions (high non-tax cost — kids' schools, community, garden infrastructure) or selling the home (high non-tax cost — housing-stability hit).

### City (Provo)

#### Provo City — overall

- **Grade.** **C.**
- **Reservations.** Government-as-utility default. Generally well-managed for a city of Provo's size and demographics. Sub-services (library, parks, code enforcement, elections) carry their own informal grades — likely B-tier for library / parks, C-tier default for the rest — not graded individually in this cycle.
- **Criticality.** Cross-domain. Provo City sits behind several utility entries in [utilities.md](utilities.book-chapter.md) (Provo Power, water/sewer, trash/recycling) — this entry covers the non-utility services.

## Strategy

The non-utility government-services strategy is dominated by **involuntary dependencies with no available exit.** Remediation reduces to minimize-exposure plus monitor-for-escalation rather than the usual switch-or-eliminate pattern.

### 1. Involuntary federal dependencies — minimize exposure, monitor for escalation

IRS, Selective Service, and Passport / State Department have no available exit within the current jurisdictional choice. Strategy:

- **Minimize information exposure** to each agency — share only what is statutorily required.
- **Maintain compliance** to avoid friction — non-compliance has criminal or denial-of-service exposure that exceeds the gain.
- **Track political alignment changes** that would escalate any of the grades further. See the federal-monitoring TODO item.

Not a target for active remediation. Re-evaluate only if expatriation becomes a serious option in a future cycle — at which point the IRS-D / Selective-Service-pseudo-F / Passport-D constraints reshape the cost-benefit on jurisdictional change.

### 2. State-level dependencies — same constraint within Utah

DMV and Utah state income tax sit under the same logic at state scale. Exit option = move states; cost-benefit shifts with the destination jurisdiction. Not currently a remediation target.

**Homeschool registration B is the exception** — load-bearing positive, not a constraint to escape. Strategy is "actively use the framework as designed" plus monitor for legislative erosion attempts. See the Utah-state monitoring TODO item.

### 3. Property tax — invisible constraint

Already canonical in [audit-scope.md → invisible constraints](audit-scope.book-chapter.md#invisible-constraints--the-load-bearing-bucket). Remediation paths in cost order:

1. **Accept and pay** (current default).
2. **Leverage state-level homestead exemptions / age-based deferrals** when eligible.
3. **Reduce home value** (downsize). High non-tax cost.
4. **Move jurisdictions.** Highest non-tax cost.

None urgent at the current life stage.

## Framework patterns surfaced

- **Involuntary dependencies — the pseudo-F grade.** When a dependency cannot be exited via any normal mechanism (Selective Service, mandatory federal-level registrations, mandatory professional licensure in some fields), the standard F prescription "exit ASAP regardless of switching cost" is unactionable. **Pseudo-F** marks a dependency where the *behavior* earns F but *toleration is not voluntary*. Distinct from D-with-F-disposition (the IRS case — F-worthy behavior with an exit option, expensive-but-real). The remediation strategy collapses to minimize-exposure + monitor-for-escalation. Landed as a subsection in [grading-scale.md → involuntary dependencies — the pseudo-F grade](grading-scale.book-chapter.md#involuntary-dependencies--the-pseudo-f-grade).
- **Mandatory dependencies vs invisible constraints.** Closely related but distinct shapes:
  - **Mandatory dependencies** (Selective Service, IRS, Utah state tax while resident) — cannot be exited at all within the jurisdiction; only escape is jurisdictional change, and for some (Selective Service after registration) not even that.
  - **Invisible constraints** (property tax, kids' schools, community ties) — feel inescapable because alternatives are expensive, but exits *do* exist.
  - The framework distinguishes them because the remediation strategy differs: mandatory has no exit even at high cost; invisible-constraint has an exit at high cost. Worth a future framework note formalizing the distinction.
- **B-grade outliers in C/D-default sectors.** Homeschool registration earning B against a C/D-default government-services sector parallels Costco earning B in a D-default corporate sector and Dr. Robinson earning B inside Grandview's C institution. **The B-grade outliers concentrate in dependencies where the structure is intentionally aligned** — Utah's homeschool law deliberately friendly, Costco's mutual-style member-first orientation, Dr. Robinson's personal alignment with patient outcomes. Worth a future framework note; composes with [healthcare.md → individual-vs-institutional](healthcare.book-chapter.md#framework-patterns-surfaced) and [utilities.md → grade can vary by product line](utilities.book-chapter.md#framework-patterns-surfaced).

## Open audit gaps

- **SSA / SSDI rule compliance for the relatives' UCCU arrangement.** Load-bearing for those relatives' benefits eligibility — see [banking.md](banking.book-chapter.md). Not yet captured in detail.
- **Provo City sub-services** — library, parks, elections, code enforcement. Informal grades, not landed individually in this cycle.
- **Federal escalation signals to monitor** — passport-politicization patterns, IRS audit-targeting patterns, Selective Service rule changes.
- **Utah state escalation signals to monitor** — homeschool-law erosion attempts, property-tax assessment-methodology changes, state income tax rate moves.
