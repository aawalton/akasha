
# Personal context

> Personal context — the specific facts about who this framework is written for (jurisdiction, household, assets, capabilities, infrastructure). Anchors every audit and plan decision so Future-Alan can interpret the ranking and remediation correctly.

The framework is mine, written for me alone. Future-Alan reading any audit entry or plan item needs to know who the framework was written for — what jurisdiction, what household, what assets, what capabilities, what infrastructure already exists. Without these facts the ranking criterion can't be applied correctly, because risk-adjusted exposure depends on what specifically I depend on.

These are snapshot facts as of 2026-05-15. Some are stable (jurisdiction, household composition). Some are not (asset valuations, market conditions). Where a number is current-but-not-stable, the volatility is flagged in-line.

For the **chronological** companion — the same life read as a narrative arc across eras rather than a present-tense snapshot — see [life-chronology.md](life-chronology.book-chapter.md).

## Jurisdiction

- Provo, Utah, USA.
- Home address: 1350 Apple Ave. Relevant for property-tax math and for the jurisdictional dependencies (state of residence, county / city services, school district) that get audited as invisible constraints.

## Housing

- Owned home at 1350 Apple Ave.
- Valuation: ~$1.2M is the optimistic top. **This is a current number, not a stable one** — it may drop as the housing market worsens. Treat the valuation as volatile when it feeds remediation math.
- Mortgage: ~$500k outstanding. I count **~$500k equity** in the house. $700k equity would be optimistic — it assumes the top-end ~$1.2M valuation holds; ~$500k is the figure I actually plan against.
- Recently completed landscaping. Eight 4×8 raised garden beds — 256 sq ft of bed space, substantial food-production capacity.
- Six mature fruit trees plus two newly planted — eight total.

The garden beds and fruit trees are a deliberate self-reliance investment already underway. Food-audit ranking treats them as existing capacity, not aspirational.

## Income

- Retired. No employer; no client work.
- Net worth splits into three pieces I track separately:
  - **~$1.7M in liquid stock investments.**
  - **~$500k home equity** (see Housing above).
  - **~10% of net worth in illiquid Latitude stock** — the startup I cofounded. It sits outside any brokerage, so I do **not** fold it into the ~$2.2M reachable/exposed surface (~$1.7M stock + ~$500k equity) the audit treats as my liquid exposure. It is a separate, illiquid dependency of its own.
- On the ~$1.7M liquid stock: the older snapshot recorded it as 100% at Vanguard, 100% in VTIAX (Vanguard Total International Stock Index). My current settled statement only affirms "$1.7M in stock investments" — it does not re-confirm the custodian or the single fund, so treat the Vanguard/VTIAX split as **not currently affirmed** rather than a standing fact. What is known: ~$1.7M liquid stock, plus the ~10% illiquid Latitude slice held entirely outside any brokerage.

To the extent the liquid stock remains in the Vanguard/VTIAX stack, the concentration has three layers stacked, and each is a separate dependency the framework has to evaluate:

1. **Vanguard as the institution.** Mutual-owned, historically strong on trust, but recent service-quality complaints are an early enshittification signal worth re-evaluating against the trust criterion.
2. **VTIAX as the single fund.** All eggs in one fund vehicle.
3. **International-equity-return as the income mechanism.** A single asset class drives every dollar of expected return; correlated macro shocks hit everything at once.

This stack is the largest single financial dependency the audit has and the remediation plan has to treat it accordingly.

## Household — five members, all AuDHD

- **Alan** — 40, author of this book, Vyvanse for ADHD. **16 months into an estimated 3-5 year recovery from severe autistic burnout (5-year upper anchor)** (canonical recovery-duration figure: [autism-burnout.md](autism-burnout.book-chapter.md)). Bandwidth ceiling applies to remediation pacing: the plan has to be paced for what burnout-recovery Alan can sustain, not what an unconstrained Alan could push through.
- **Jenny** — 37, wife. Professional-level cook — significant food-self-reliance capability.
- **Lizzy** — 17, daughter. Near the college-transition window.
- **Joseph** — 14, son. On Guanfacine for ADHD.
- **Katara** — 11, daughter.

The household composition produces dependencies the framework has to recognize:

- Family-of-5 ties to housing (5-person home, can't trivially downsize).
- Healthcare for 5 people, including two prescription dependencies (Vyvanse for me, Guanfacine for Joseph) — pharmacy and prescribing-provider become load-bearing for two household members.
- Education ties to the Provo jurisdiction (kids' schools, kids' social ties). Moving means uprooting children. This is an invisible-constraint dependency on the jurisdiction itself, not a Provo-services dependency.

## Formative experiences — Russia, age ~20

A piece of biography that anchors a load-bearing mechanism elsewhere in the book. In my first six weeks in Russia — age about 20, on my mission, still fighting for the language — I was held at knifepoint by a drunk for an hour, punched on a subway car, and chased through the streets at night. I state these flatly; that is how they sit. The framework-relevant fact is that in that window the people who turned me away and the people who could kill me were the same class of event — strangers, unreadable, possibly lethal — so my nervous system fusing rejection with bodily danger was correct learning, not a misfire. The mechanism this trained is worked out in [criticism-and-ostracism.md → why rejection fused with bodily danger](criticism-and-ostracism.book-chapter.md#why-rejection-fused-with-bodily-danger--the-russia-experiences).

## Health profile

- Whole household is AuDHD. No major chronic physical conditions to call out.
- Two active prescriptions in the household (Vyvanse, Guanfacine). Pharmacy + prescribing-provider is therefore load-bearing for two household members and ranks accordingly in the healthcare audit.

## Vehicles

- One vehicle: 2015 Honda Odyssey. Minivan; 11 years old.
- Single-vehicle coupling for a family of five — losing the vehicle disables the household for everything beyond walking distance. Single-point-of-failure on transportation.

## Tools and physical-repair capability

- Significant hand tools and power tools. No full inventory yet — the audit will produce one.
- Garage available, not used for parking. Could be dedicated workshop space.
- Standard gardening tools.
- **GlowForge laser engraver.** Opens fabrication-based self-reliance for repairs and replacement parts.

GlowForge is the dual-nature case the framework should expect to see more of: it's simultaneously a self-reliance asset (I can fabricate parts I would otherwise have to buy) and a SaaS dependency (the device requires cloud connectivity to operate; Glowforge can disable it remotely). Both sides count when ranking.

## Non-software skills

Decent amateur level across:

- Cooking (Jenny is professional-level).
- Medical / first-aid.
- Financial / investment.
- Auto repair.
- Home repair: plumbing, electrical, HVAC, carpentry.
- Gardening.
- Sewing / textiles.
- Negotiation / legal / contracts.

Animal husbandry is explicitly out — not an interest, not a remediation path.

The framework-relevant observation is the multiplier. AI support is what turns "decent amateur" into actionable capability across all of these domains — the difference between knowing roughly how an HVAC system works and being able to diagnose and repair one in the moment is mostly AI-assisted reasoning. That makes the Anthropic API load-bearing precisely because it amplifies everything else. Captured separately as an AI-dependency thread in `/abby`'s backlog.

## Software infrastructure — self-hosted K8s cluster

Two tiers — load-bearing (something real breaks if it goes away) and convenience (annoyance but not breakage). Detail and code locations for each component live in the repo; this is the framework-level inventory.

### Load-bearing self-hosted

- **Postgres 18** — universal data store. `packages/infra/k8s/postgres/`.
- **GoTrue** — Supabase auth, RS256 JWTs under supabase.alanwalton.com. `packages/infra/k8s/gotrue/`.
- **PostgREST** — REST API surface. `packages/infra/k8s/postgrest/`.
- **Supabase Realtime** — WebSocket subscriptions. `packages/infra/k8s/supabase-realtime/`.
- **Headscale** — self-hosted Tailscale coordination at headscale.alanwalton.com. `packages/infra/k8s/headscale/`.
- **git-transport** — primary git server at git.alanwalton.com (GitHub is downstream mirror). `packages/infra/git/transport/`.
- **BuildKit** — only container-image builder. `packages/infra/k8s/buildkit/`.
- **Private registry** — all app images. `packages/infra/k8s/registry/`.
- **MetalLB** — LoadBalancer VIPs. `packages/infra/k8s/metallb/`.
- **cert-manager** — Let's Encrypt DNS-01 TLS. `packages/infra/k8s/cert-manager/`.
- **cloudflared** — Cloudflare Tunnel daemon. Every public hostname depends on this. `packages/infra/k8s/cloudflared/`.
- **SeaweedFS** — S3-compatible object store at s3.alanwalton.com. `packages/infra/seaweedfs/`.
- **pgbouncer** — Postgres connection pool. `packages/infra/k8s/pgbouncer/`.
- **auth-proxy** — Bun reverse proxy gating Grafana + Supabase Studio behind GoTrue. `packages/infra/auth-proxy/`.
- **Loki + Promtail** — central log store. `packages/infra/loki/service/`.

### Convenience self-hosted

Grafana, Prometheus, Supabase Studio, CI tooling (ci-tools, ci-images, ci-cri-prune, ci-storage-admin, ci-storage-maintain).

## Load-bearing third-party SaaS with no self-hosted analog

- **Cloudflare.** The most concentrated single-vendor risk in the entire dependency graph. Cloudflare is simultaneously my **registrar** (alanwalton.com, tempereso.com, audhdalan.com), my **authoritative DNS**, my **public ingress** via Tunnel, AND my **ACME validation channel** for Let's Encrypt. A single vendor failure or capture event takes out every public-facing surface I run. This is the single highest-priority non-financial concentrated risk in the audit.
- **Let's Encrypt.** TLS cert issuance via DNS-01 ACME. Structurally tied to the public CA system; effectively no alternative at comparable cost and automation.
- **Anthropic API.** Claude Code plus the agent runtime that drives every project in this repo. Load-bearing for the AI-as-force-multiplier dependency model described above.
- **Monarch Money.** Personal finance aggregation. The cleanest candidate for in-house migration — replace with a Plaid-or-equivalent ingest pipeline writing to the existing Postgres.

## Convenience third-party SaaS

- **GitHub** — mirror only. Primary git is self-hosted.
- **ScraperAPI, Spotify API, Trakt API, Notion** — used for collections sync. Annoying if they go away, not breakage.

## Workstation-level dependencies not in the repo

- **Deco router** — home LAN gear; port-forwards 443 to the cluster. Single-vendor home networking dependency.
- **Home ISP + dynamic public IP.** The cloudflared DDNS CronJob keeps A-records fresh. ISP service interruption is a cluster-availability interruption.

## How this file gets used

Every audit entry and every plan item reads against this file. When an audit says "ranking this Cloudflare dependency", the rank depends on the concentration documented here. When a plan item proposes a remediation, the timeline depends on the burnout-recovery bandwidth ceiling documented here. When a framework concept (capture event, trust reset) gets applied, the application is to specific entities listed here.

Update this file when a major fact changes — household composition, jurisdiction, total assets, the asset-concentration structure, or the infrastructure tier of a component. Volatile numbers (housing valuation, asset total) do not warrant per-cycle updates; refresh on major moves only.
