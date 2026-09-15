
# Healthcare

> Healthcare audit — inventory of every medical, dental, and pharmacy dependency I currently lean on, with a trust grade per `grading-scale.md`. Surfaces the individual-vs-institutional trust pattern, the self-reliance-as-not-needing extension, the controlled-substance DoS exposure on the Vyvanse chain, and the observation that healthcare has the highest density of B-grade dependencies in the audit so far.

Every healthcare-side dependency I currently lean on — insurance, providers, pharmacy, prescription chain. Grades per [grading-scale.md](grading-scale.book-chapter.md). One section per dependency; the long-term remediation direction sits at the bottom because it changes the shape of the audit (medication-independence eliminates the prescription chain rather than diversifying it).

## Inventory

### Select Health

- **Service.** Primary commercial medical insurance carrier for the household, purchased through the ACA marketplace.
- **Grade.** **D.**
- **Reservations.** Large publicly-traded health insurer with structural shareholder-pressure exposure. Standard ethics concerns for the US for-profit insurance industry — denial patterns, prior-authorization friction, profit incentives misaligned with patient outcomes. No Select-Health-specific bad acts I'm tracking; the D comes from the structural category, not from a singular incident.
- **Criticality.** Load-bearing. Insurance is the price-rationing gate for almost every other healthcare relationship in this list.
- **Notes.** The insurer is upstream of the providers — losing this dependency cascades into how I pay for everything downstream of it.

### ACA Marketplace (HealthCare.gov)

- **Service.** The federal exchange through which Select Health was purchased. Not the insurer itself — the venue.
- **Grade.** **C.**
- **Reservations.** Subject to political dismantling depending on administration; the structural premise (subsidized exchange-based coverage) depends on continued ACA funding and statutory structure. Not actively bad; closer to a government-as-utility offering per [alternatives.md → government-as-utility](alternatives.book-chapter.md#6-government-as-utility). Grade lands at C because the political-durability reservation prevents B.
- **Criticality.** Load-bearing as the procurement channel. If the marketplace disappears, the cost shape of insurance changes underneath me.

### Costco Pharmacy

- **Service.** Prescription dispensing for the household, including the load-bearing prescriptions below.
- **Grade.** **B.**
- **Reservations.** Standard Costco-as-org reservations carry over — notably the no-third-party-testing concern on supplements, which is less relevant for prescription drugs (those are FDA-regulated and don't pass through Costco's supplier discretion the same way) but still part of the institutional posture. Strong on pricing and consumer alignment relative to other pharmacy chains.
- **Criticality.** Load-bearing for the prescription chain.
- **Notes.** Cascading dependency — Costco Pharmacy access is downstream of Costco membership which is downstream of the Citi cobrand. See the [banking audit](banking.book-chapter.md#citi) for the Costco-Citi entanglement.

### Grandview Family Medicine (the institution)

- **Service.** Primary care clinic. Houses the practitioner relationship below.
- **Grade.** **C.**
- **Reservations.** No specific bad acts I'm tracking. Default tier for "no strong alignment signal either way" — per [grading-scale.md → C](grading-scale.book-chapter.md#c--acceptable-for-now), C is the assume-neutral position, not a positive assessment.
- **Criticality.** Indirectly load-bearing via Dr. Robinson — if the practitioner leaves, the institution becomes the residual relationship, and the grade at the institutional level is what I'd be left with.

### Dr. Robinson at Grandview Family Medicine

- **Service.** Primary-care provider. Prescriber of record for both load-bearing prescriptions in the household.
- **Grade.** **B.**
- **Reservations.** Individual-level trust is structurally fragile. The practitioner can leave practice, retire, change behavior, or move to a different system, and there is no institutional control that would carry the trust forward. The B is for the person as I currently experience the relationship; the institutional fallback if the person leaves is the C-tier Grandview entry above.
- **Criticality.** Load-bearing as the single prescriber. No backup prescriber relationship exists.
- **Notes.** Cleanest example in the audit of trusted-individual-inside-untrusted-institution — see the framework illustrations section below.

### Ninth East Dental

- **Service.** Adult dental care for the household.
- **Grade.** **C.**
- **Reservations.** No specific bad acts. Default tier.
- **Criticality.** Medium. Dental relationships are substitutable with moderate friction.

### Pediatric dentist (under the Ninth East Dental umbrella)

- **Service.** Pediatric dental care for the kids.
- **Grade.** **B.**
- **Reservations.** Same individual-vs-institutional caveat as Dr. Robinson — the B is the practitioner-level read on the pediatric provider; the institutional fallback is the C-tier Ninth East entry above.
- **Criticality.** Medium.

### Specialists

None active. Low coupling. Worth flagging as an audit hole only if a specialist relationship begins — it doesn't represent a current dependency.

### AuDHD-specific providers

None active. Diagnoses are established for household members; there is no ongoing AuDHD-specific provider relationship driving the diagnosis label or coordinating care around it. Flagged below as an open audit question — whether to build one for the adolescent transitions ahead.

## Prescription chain

The load-bearing detail in this domain. Two active prescriptions, both routed through the same prescriber and the same pharmacy:

- **Vyvanse (Alan).** Schedule II controlled substance for ADHD. Prescribed by Dr. Robinson at Grandview Family Medicine, filled at Costco Pharmacy.
- **Guanfacine (Joseph).** Non-controlled. Same prescriber, same pharmacy.

**No backup prescriber, no backup pharmacy.** The chain is single-threaded end-to-end.

Short-term mitigation: a small stockpile is maintained at home, enough to absorb short supply-disruption windows.

The Vyvanse chain specifically has demonstrated DoS exposure. The 2022-2023 ADHD-medication shortage is the concrete precedent — DEA quotas, manufacturer capacity, pharmacy refusal patterns, prescriber unavailability around refill timing, and insurance prior-authorization friction are all real failure modes for a Schedule II prescription, and several of them fired at once during the shortage. The stockpile addresses the short-tail of supply disruption, not the structural exposure.

## Strategy — medication-independence direction

The strategic intent is not to add a backup prescriber and a backup pharmacy. It's to eliminate the prescription dependency entirely. This is a self-reliance move in the "not-needing" shape — see [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing).

- **Joseph's Guanfacine.** Currently in active discontinuation testing. If the test holds, the prescription chain for Joseph is eliminated rather than diversified.
- **Alan's Vyvanse.** Long-term direction is also medication-independence, sequenced behind burnout-recovery lifestyle work — sleep architecture, nutrition, and AuDHD-coping skill development that reduces the medication need rather than working around it. Not a short-term move; tied to broader recovery progress.

The direction matters for the rest of the audit. If the prescription chain is being eliminated, the right remediation move for the Vyvanse DoS exposure is not "find a second pharmacy" — it's "execute the medication-independence pathway." Diversification would lock in the dependency the strategy is trying to remove.

## Framework patterns surfaced

Patterns this audit produced that the framework should record (or already records) for use across other domains:

- **Individual-vs-institutional trust.** Dr. Robinson (B) inside Grandview Family Medicine (C) is the cleanest illustration. The trust assessment can run at the practitioner level rather than the institutional level, and the institutional grade becomes the residual fallback if the individual relationship ends. The fragility caveat is real — individual-level trust has no structural protection against the person leaving — so the institutional grade is the floor, not a footnote. Worth elevating to a framework note in a future cycle.
- **Self-reliance as not-needing.** The medication-independence direction is the first concrete worked example. For some dependencies, the highest-leverage remediation isn't switching vendors — it's eliminating the underlying need. Lands as an extension of [alternatives.md → self-reliance](alternatives.book-chapter.md#4-self-reliance), captured in this cycle alongside the audit.
- **Healthcare carries the highest density of B-grade dependencies in the audit so far.** Costco Pharmacy, Dr. Robinson, and the pediatric dentist all land at B. Local, individual-level, person-to-person relationships consistently outscore corporate-scale institutions in this domain — and this is the same pattern that the banking audit failed to reach (its highest grade was the Vanguard B, an institutional B, not a person-to-person B). Worth a future framework note on the scale-vs-trust relationship.
- **Controlled-substance DoS exposure.** Vyvanse demonstrates that a Schedule II prescription chain is a structural DoS surface — DEA quotas, manufacturer capacity, pharmacy refusal, prescriber unavailability, insurance friction. Composes with [capture-events.md](capture-events.book-chapter.md) as a sibling threat category and with the threat-categories framework note pending in `/abby`'s backlog. Stockpile is short-term mitigation; medication-independence is the structural answer.

## Open audit gaps

- **Eye care.** Five-person household, no eye-care provider captured. Likely a real ongoing relationship for at least some household members. Surface in a follow-up cycle.
- **Emergency healthcare.** Urgent care preference, ER hospital choice, after-hours / weekend / non-routine care plan. Not currently captured.
- **Mental health / AuDHD-specific providers.** None currently. Worth flagging whether to build one for the adolescent transitions ahead — Lizzy at 17, Joseph at 14 — where the absence of a provider relationship may become more costly than it currently is.
- **Costco-Pharmacy cascade.** Prescriptions filled at Costco require Costco membership, which is tied to the Citi cobrand. The dependency graph is: Citi (D) → Costco membership → Costco Pharmacy (B) → prescription chain. The B-grade pharmacy is downstream of a D-grade financial relationship. Cross-reference the [banking audit](banking.book-chapter.md#citi).
