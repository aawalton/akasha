
# Information and media

> Information-and-media audit — every news, books, podcast, long-form, search, and information-side-of-social dependency I currently lean on. Grades per `grading-scale.md`. Surfaces the information-diet-as-remediation pattern (whole categories eliminated by not-consuming rather than vendor-switching), Royal Road as a B-tier outlier inside a D-tier platform sector, and the search-remediation path that opens up once local compute is in place.

Every information-and-media-side dependency I currently lean on — news, books, podcasts, long-form / newsletters, search, and social platforms used for information (rather than connection). Grades per [grading-scale.md](grading-scale.book-chapter.md). The headline observation is that the dependency surface here is sparse by design — multiple major categories (news, podcasts, most social platforms) have already been remediated by eliminating consumption entirely, not by switching vendors. That pattern is itself a strategy, formalized in [information-diet.md](information-diet.book-chapter.md).

## Inventory

### News

**None directly.** No daily news source — no newspaper subscription, no news app, no scheduled exposure. Indirect exposure occurs through Instagram (D-tier; see below) and through conversation with people who do consume news.

This is itself a personal-freedom strategy, not an oversight. Eliminating direct news consumption removes a whole class of dependencies at once: attention-extraction platforms, outrage-cycle pipelines, algorithmic-feed providers. Same shape as the [medication-independence direction in healthcare](healthcare.book-chapter.md#strategy--medication-independence-direction) — the answer to a D-grade vendor category is sometimes "stop having the need at all" rather than "find a better vendor." Composes with [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing) and is the worked example behind [information-diet.md](information-diet.book-chapter.md).

### Books

#### Amazon (Kindle)

- **Service.** Primary ebook source for the household. Kindle device plus Kindle app on phones / tablets.
- **Grade.** **D.**
- **Reservations.** Amazon-as-org carries well-rehearsed concerns — workplace and warehouse-labor practices, anti-competitive market behavior in multiple verticals, Bezos-era political-alignment shifts. The Kindle product line specifically adds DRM lock-in (Kindle-format books bind to the Amazon account) and the ebooks-as-licensed-not-owned posture (Amazon retains the legal ability to revoke access to purchased books — a power they have used, historically rare but documented).
- **Criticality.** Medium. Active dependency for ebook reading; switchable with friction. Same "active dependency despite D-grade verdict" shape as [Walmart in the food audit](food.book-chapter.md#walmart-including-walmart-grocery-delivery) — see the framework patterns section in food.md.
- **Notes.** D comes from the parent grade — same shape as [Gmail / Drive / YouTube under Google in software-and-saas](software-and-saas.book-chapter.md#gmail-google). The Kindle product line doesn't carry specific positive evidence that would lift it above the parent default, and the DRM + licensing reservations push in the same direction.

#### Audible

- **Service.** Audiobook subscription service.
- **Grade.** **D.**
- **Reservations.** Amazon-owned (same parent-org concerns as Kindle). The audiobook product line layers on subscription-locked content and DRM — Audible-format files bind to the Amazon account, similar to Kindle but with the additional subscription-cancellation-loses-the-library shape that pure-purchase ebooks don't have.
- **Criticality.** Medium. Active dependency for audiobooks; switchable with friction.
- **Notes.** Same parent-grade-inheritance shape as Kindle. The audiobook-specific reservations (subscription lock-in plus DRM) reinforce the parent default rather than overriding it.

#### Royal Road

- **Service.** Web fiction platform — serialized LitRPG, progression fantasy, and other web-native fiction. Free to read.
- **Grade.** **B.**
- **Reservations.** Ad-supported revenue model, which is the standard reader-aligned-but-attention-monetizing shape rather than the platform-extraction shape. No major capture signals on the publicly available track record.
- **Criticality.** Low-to-medium. Recreational reading source, substitutable but not trivially replaceable for the specific fiction-genre niche it covers.
- **Notes.** **B-tier outlier inside a D-tier platform sector** — aligned by design (free to read, reader-first, a light platform layer over a direct writer-reader connection) rather than by mission claim. The outlier list and the shared structural-alignment mechanism are developed under [Framework patterns surfaced](#framework-patterns-surfaced).

### Podcasts

**None.** No podcast app installed, no recurring podcast subscriptions, no scheduled podcast listening. Same not-needing shape as news — a whole category remediated by elimination rather than by vendor selection.

### Long-form / newsletters

#### Substack

- **Service.** Newsletter platform hosting a set of independent writers I read. Light-touch infrastructure over a direct writer-reader connection.
- **Grade.** **B.**
- **Reservations.** Platform-capture risk. Substack-the-company has had controversial content-moderation episodes (which way the platform leans on moderation is a leading indicator either way), and the payments / monetization stack is the natural enshittification surface if the company shifts strategy. The B grade is for current behavior, not for structural guarantee — there is no purpose-trust governance, no mutual ownership, no irrevocable mission lock. If Substack pivots, the grade resets per [capture-events.md](capture-events.book-chapter.md).
- **Criticality.** Low-to-medium. Recreational / informational source. Replaceable in principle, though the specific writers I follow would each need to be tracked through any platform migration.
- **Notes.** Current-behavior B, not structural B. Monitor for capture signals: changes in content-moderation policy, monetization-extraction moves (mandatory paid tiers, fee shifts), mandatory vendor-lock features (limiting writer portability or reader access). See the TODO item.

### Search

#### Google Search

- **Service.** Default web search.
- **Grade.** **D.** Inherits the Google parent grade already established in [software-and-saas.md → Gmail / Drive / YouTube](software-and-saas.book-chapter.md#gmail-google).
- **Reservations.** Search-specific behavior has degraded visibly over the last several years: ads pushed above results, AI-overview features displacing publishers, declining result quality for non-commercial queries. The parent-organization Google reservations apply on top of the search-specific degradation.
- **Criticality.** Medium-to-high. Active default for general web search across the household.
- **Notes.** Parent-grade inheritance with no positive evidence on the search product line to override the default — the search-specific behavior is in the same direction as the parent default, not opposed to it. Remediation path opens up once local compute is in place: Claude / local-model-as-search reduces the Google search dependency by routing some of the queries through capability the household owns. Substitutes also exist already (Kagi, Perplexity, DuckDuckGo) each with their own grade concerns and switching cost.

### Social platforms (information-side)

#### Instagram

- **Service.** Occasional ambient news exposure and personal-network observation. Not a primary information source.
- **Grade.** **D.** Meta-owned — standard publicly-traded-attention-extraction posture.
- **Criticality.** Low. Low load-bearing surface; could be eliminated without significant impact on information access.
- **Notes.** Same parent-grade-inheritance shape as the Google products.

#### Everything else

**Not used as ongoing dependencies.** No Reddit, no HackerNews, no Discord (for information rather than connection), no Mastodon, no X / Twitter. Another set of not-needing outcomes — a whole sub-category remediated by elimination.

## Strategy

The information-and-media strategy is **maintain the sparse-by-design info diet, remediate the active book and search dependencies as bandwidth allows, monitor the B-tier dependencies for capture signals.** Not a category-wide overhaul.

### 1. Maintain the information-diet sparsity

The current sparsity (no news, no podcasts, almost no information-side social) is the highest-leverage move in this domain and it is already in place. The action is "maintain, with periodic review." See [information-diet.md](information-diet.book-chapter.md) for the full pattern.

### 2. Amazon / Audible book remediation — bandwidth-gated

D-grade ebook plus audiobook dependency on a single parent (Amazon). Healthy alternative space:

- **Provo Library + Libby + Hoopla.** Free, library-aligned, government-as-utility C-tier per [alternatives.md → government-as-utility](alternatives.book-chapter.md#6-government-as-utility). Low-effort migration once the workflow is set up.
- **Libro.fm.** Indie-bookstore-aligned audiobook service, candidate B-tier per the [cultivating-local-relationships.md](cultivating-local-relationships.book-chapter.md) shape applied to the audiobook category. Higher cost than Audible but trust-aligned with independent booksellers rather than with Amazon.
- **Physical books.** One-time-acquisition self-reliance — same shape as [the garden in food.md](food.book-chapter.md#home-garden-plus-8-fruit-trees), capital-acquired capability rather than ongoing relationship.
- **Royal Road.** Already-B alternative for the fiction-genre slice it covers.

Migration is bandwidth-gated like the Walmart exit. The alternatives space is healthy enough that the answer is "when bandwidth recovers" rather than "if alternatives exist."

### 3. Substack capture-signal monitoring

Current B is current-behavior-only. Watch for the specific signals listed in the Notes above (content-moderation shifts, monetization extraction, mandatory vendor lock-in). The capture-event watch from [capture-events.md](capture-events.book-chapter.md) applies with the standard trust-resets-to-zero rule if any signal lands.

### 4. Search remediation — pending Mac Studio + local-model migration

Tied to the [Anthropic remediation strategy](anthropic-remediation.book-chapter.md) — the same Mac Studio + local-model capability that retires the Anthropic Max subscriptions also opens up local-model-as-search as a partial replacement for Google. Search is currently Google (D) by default; substitutes are available now (Kagi, Perplexity, DuckDuckGo) but the highest-leverage move is the same capital-acquisition path already planned for the AI dependency.

## Framework patterns surfaced

- **Information-diet sparsity as personal-freedom strategy.** The household has remediated news, podcasts, and most information-side social platforms by eliminating consumption, not by switching vendors. The not-needing direction from [alternatives.md → self-reliance as not-needing](alternatives.book-chapter.md#self-reliance-as-not-needing) applied at the category level rather than the per-vendor level. Lands as [information-diet.md](information-diet.book-chapter.md).
- **B-tier outliers in a D-tier sector — extended to platform infrastructure.** Royal Road joins the existing concrete-outlier list: homeschool registration (Utah-government D default), Costco (corporate-scale D default), Dr. Robinson (institutional C default), Edgemont Auto (transportation D default), pediatric dentist (corporate-scale C/D default). The structural alignment mechanism is the same in each case — aligned by design rather than by mission claim. Composes with the pending [structurally-aligned-outliers framework note](grading-scale.book-chapter.md) (an open thread in `/abby`'s backlog).
- **Same-parent product-line inheritance extended.** Google search D inherits the parent grade established for Gmail / Drive / YouTube in [software-and-saas.md](software-and-saas.book-chapter.md#gmail-google); the search-specific behavior reinforces the default rather than overriding it. Same pattern applies to Audible inheriting from Amazon. Composes with [grading-scale.md → Grade can vary by product line](grading-scale.book-chapter.md#grade-can-vary-by-product-line-within-one-parent-company) — when the parent grade is D and the product line lacks specific positive evidence, default to the parent grade. The reverse case (Google Fiber C lifting above the Google D default) requires concrete product-specific evidence; absent that, the default holds.

## Open audit gaps

- **Specific Substack subscriptions.** Which newsletters specifically, what they cover, and whether any of the writers themselves are candidates for cultivation if Substack-the-platform captures (the writers are the actual trust target; the platform is the current delivery mechanism).
- **Provo Library digital-service utilization.** Library card status, Libby setup, Hoopla setup. Flagged as the low-effort migration alternative to the Amazon / Audible dependencies — operationalize before the broader migration plan.
- **Reference sources beyond Google.** Wikipedia, specific encyclopedic resources, archival or specialty-topic references. N/A confirmed for now (no ongoing paid research subscriptions), but worth re-checking annually as the search-remediation strategy matures.
