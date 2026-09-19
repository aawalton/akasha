# Narrative Game Engine — define-front working notes

Alan's hypothesis (7 pts): tower+dragons = cases 1-2 of a generalized narrative game engine;
ready to play cases 3-10; engine lives in alanwalton.com like the pages system; a game is a PAGE
and ALL differences are properties not code; GM agent adds capabilities via DATA; genuinely-new
fundamental capabilities = generic engine enhancements usable by any game (pages-system-style);
tear down tower+dragons after live.

## Span of games 3-10 (Alan, sole-source)
pure narrative → TTRPG → cultivation → dungeon core → civilization building → crunchy classic LitRPG.
Axes of variation revealed:
- mechanics weight: zero (narrative) → heavy (LitRPG/TTRPG). Mechanics = optional data module.
- controlled-entity: single protagonist (LitRPG/cultivation) | party (TTRPG) | the dungeon (dungeon core) | a nation (civ). BIGGEST axis.
- resolution: dice tables | deterministic formulas | resource math | none.
- progression: levels/XP | cultivation realms/breakthroughs | tech trees | dungeon upgrades.
- turn scale: combat action | session | defense wave | civ era.
- goal: open | survive | conquer | ascend.
Shared spine (does NOT vary): coordinator agent + turn loop + action box + narrative published as chapters/beats + game-state blob (often fog-of-war) + reader surface toggling display modules.

## Strategy (Aura recommendation, principle-driven)
Grow the engine game-by-game, NOT all-at-once. Build spine + just enough for case 3; each new game
PULLS the next generic capability into the engine (avoid building what isn't needed yet; Rule of
Three; first make the change easy). Recommend case 3 = close-to-existing (crunchy LitRPG or
cultivation, both Tower-shape single-protagonist+progression) to prove extraction cheaply; dungeon
core / civ (alien controlled-entity) come later once engine has legs. AWAITING Alan's case-3 pick.

## Scout C — pages system as architecture template (KEY REFRAME)
Do NOT build a parallel `games` table/engine. A game IS a page (pageType `game`); per-game
differences = properties; turns/chapters = pages; per-turn orchestration = existing events/proc
system. New fundamental capability = new property-type or generic proc → every game inherits free
(exactly pages-system extensibility). Refs: packages/shared/pages/{core,access,events,proc,proc-compiler}.
- page-types & property-definitions ARE rows in public.pages (page_type_slug='page-type'/'property-definition'); created via `bun ops page-type` / `bun ops property-definition`.
- EAV: public.pages, attributes jsonb bag keyed by property stringId; GIN index on (page_type_slug, attributes).
- PropertyType registry + PropertyTypeOps interface = how a new capability lands once and benefits all types.
- events/proc: every write emits events atomically via _pages_emit_db_result; workers subscribe by pageTypeSlug+eventName.
- access boundary: @shared/pages-access (Supabase JS) + /pg (in-tx). check-no-raw-pages-sql gate.

## Scout A — Tower code-vs-data inventory
Page types (DATA today): game-character {externalId,kind,level,class,sheet(passthrough)},
tower-floor {externalId,floor,theme,floorData(passthrough),designerNotes(loop-dark)},
tower-session {turn,hud(typed),sheet(RevealedSheet .strip()),log,chapters,character rel,floor rel}.
Engine (@alanwalton/tower-engine, pure rank1) BAKED-IN CODE → must become data:
- derive.ts: HP=VIT*8+MIGHT*2 etc; 8 attributes (MIGHT,FINESSE,VITALITY,INTELLECT,PERCEPTION,WILL,PRESENCE,LUCK)
- resolve-action.ts: combat margin bands, damage scaling, crit/fumble, gate application
- rng.ts: 2d10 bell vs 1d20 flat, crit/fumble rates; seeded mulberry32
- retrofit-system-cards.ts: skill rung ladder (novice..sage), affinity tier ladder, card vocab (LEVEL UP/SKILL/AFFINITY/CLASS/TITLE)
- hud-panel.tsx: pool names VITAE/FOCUS/STAMINA + red/blue/green; equip slot renames weapon->mainHand, armor->cloak
- flat leveling (+1/floor, no XP)
Judgment stays AGENT-side: gate (damage mult), intent (plausibility) assigned by coordinator (iris), NOT engine. Engine = pure deterministic resolver parameterized by (seed+input+rulebook).
Loop-dark: revealed .strip() projection; renderer reads only typed beats; web imports core schemas never cli. Mode env: TOWER_STORY_EMERGENT_ID selector, TOWER_COORDINATOR_AGENT_NAME, TOWER_GAME_DISPLAY_NAME.
CLI verbs: snapshot/commit/turn/state/seed-page-types/import-save/archive.

## Scout B — stories domain (KEY CORRECTION: dragons runs on AUTHORED model, not emergent tick)
THREE substrates exist, not two:
1. Tower (hard-mechanics, code-baked engine) — case 1.
2. stories/EMERGENT engine (packages/stories/engine): perceive>know>feel>want>do 5-stage pipeline,
   multi-agent (story-agent-character/story-setting-character/story-integrator), pure-tick workflows
   (.claude/workflows/story-tick.ts, story-live.ts). Prose-first; structured data only under pressure.
   NOT what dragons uses.
3. stories/AUTHORED (packages/stories/authored) — THIS is what dragons-and-dungeons runs on. Page types:
   story, story-chapter, story-build, story-decision, story-wiki. Aria + writing team author it.
   *** ALREADY expresses game rules as DATA: story-build frontmatter `gameSystem` = rules engine def;
   story-decision `options:[{label,description,effect}]` = branching mechanics as data; GM (Aria) edits
   build/<slug>.md as data each turn (point 5 of Alan's vision ALREADY half-built here). ***
   Single-writer (Aria) commits+deploys; decisions render as in-world SYSTEM selection screens; live
   surface polls published chapters (no separate state write).

CRUX: stories/authored already proves "narrative + light rules as DATA". Tower proves "hard crunch in
CODE". The generalized engine must span light(authored)<->crunchy(rulebook-as-data). The MISSING half is
turning Tower's code-baked crunch into data. Case-3 recommendation refined: cultivation or crunchy LitRPG
(single-protagonist+progression like Tower, but different rulebook) FORCES the crunch-as-data extraction
= the actual hard unlock. Narrative-as-data end is already done.

Shared bones across all 3: coordinator agent + turn/chapter boundary + action-box->coordinator seam +
published chapters as canonical record + single-writer mechanics file (build/sheet) + snapshot/commit I/O
contract {turn, beat, immediates}. Differ in: state-as-prose vs state-as-JSON; single-player vs emergent
multi-agent; HUD/sheet UI vs story-only UI.

## Initiative routing (open)
No game-engine initiative exists. Existing: the-tower, personas, pages, general, temper, idle, archive-of-worlds...
Creating a NEW initiative is aine-coordinator/aine-intake authority, not Aura's. Likely this warrants
its own initiative ("narrative-game-engine") — route creation to aine-intake, then link+stamp the capture.
Decompose as umbrella + attention-sized children (Aura decides decomposition by default).

## SETTLED (Intent locked with Alan 2026-06-28)
Rule-of-Three correction (Alan): trigger = KNOWING the 3rd is coming, not waiting for it. He's committed.
SCOPE = engine core only: unify Tower+Dragons on one data-driven engine; game IS a page; ALL config->data;
both games run on it; old deployments torn down once live. Genre #3 EXPLICITLY FUTURE (he picks genre then;
expand engine directionally). "Engine core first, then expansion."
DECOMPOSITION (Aura, decide-by-default — 4 buckets, dependency-ordered):
 1. Game data model (game + turn/chapter + entity + state page-types; light<->crunchy span).
 2. Rulebook-as-data + generalized resolver (Tower's pure engine parameterized by data rulebook). HARD UNLOCK.
 3. Generic reader (display modules toggle by property; replaces env-forked tower-web; loop-dark+immersion preserved).
 4. Migrate Tower + migrate Dragons + decommission old deployments.
DECIDE-BY-DEFAULT CALLS (stated to Alan, escape hatch on first):
 - Preserve BOTH live playthroughs with full continuity (Safety: don't destroy live work). Iris's run + Aria's ~16ch.
 - Coordinator agents stay per-game (iris/aria) — engine core = data+reader+I/O substrate, NOT agent rewrite (Architecture: no premature abstraction).
PRINCIPLES: Rule of Three (satisfied by knowledge), Architecture (make-change-easy; build what's needed),
 Complexity (deep module/shallow interface — engine behind game-as-page), Purity (pure resolver/effectful shell),
 Pages Access Boundary, IaC exception (page-types are data), URL Conventions, loop-dark data boundary.
PINNED REFERENCES (build-surface gate):
 - Tower: packages/alanwalton/tower/{core,engine,web,src} (code-baked config to convert).
 - Dragons: packages/stories/authored/dragons-and-dungeons/ + emergent-story already rendered at
   alanwalton.com/emergent-story/dragons-and-dungeons-05e378b3 (~16 chapters, 2 sessions). /aria skill + game-loop-addendum.
 - stories/authored model (story-build gameSystem, story-decision options) = the rules-as-data prototype to generalize.
 - pages system (packages/shared/pages/*) = the architectural template to mirror.
NAME (Alan, locked): **Awen** — Welsh bardic breath-of-inspiration; the source narrative flows from.
ROUTING: GO relayed to aine-coordinator. Awaiting live 'awen' slug + awen-manager spawn, then capture.
 Capture umbrella+children once slug returns. Aura captures only; manager runs; Aura verifies on return.

## GO (Alan, 2026-06-28): YES — activate now. DEDICATED awen-manager requested (his call). Relayed to aine-coordinator; awaiting live slug + manager spawn, then capture.

## the-tower fold-vs-stay (Alan): CLOSE AS HISTORICAL (do not fold into Awen). archive-of-worlds untouched. Relayed to coordinator — 3rd reconciliation item resolved.

## CAPTURED 2026-06-28 — Awen initiative LIVE (slug=awen, page 019f0fa9-7106, Fun, sortOrder 7, dedicated awen-manager 019f0fab-4a21)
Umbrella #13622. Children (--parent-seq 13622, --owner aine-intake,aura, homed to awen):
 #13623 seam1 game data model (WAVE 1 foundation)
 #13624 seam2 rulebook-as-data + generalized resolver (WAVE 2, hard unlock)
 #13625 seam3 generic data-driven reader (WAVE 2)
 #13626 seam4 migrate Tower+Dragons + decommission old deployments (WAVE 3)
Wave-gating: seam1 -> seam2+seam3 -> seam4. Aura is verify-gate between waves; results return to Aura.
the-tower CLOSED+FROZEN (Iris's live run keeps playing). archive-of-worlds untouched.
STATUS: capture complete. awen-manager wakes on #13047 trigger, pulls seam1 first. Aura's role now = VERIFY on return.

## SEAM 1 VERIFIED (Aura verify-gate, 2026-06-28, main 834c2dd)
Inspected live page-types (game 019f0fdc-4a39 + game-turn/entity/state) + read schemas + 18-test span proof.
PASS: span genuine (3 axis enums name full roster as DATA, no genre-3 code overfit); both poles parse SAME
schemas (LIGHT Dragons / CRUNCHY Tower, awen-core.unit.test.ts); loop-dark generalized intact (canonical
passthrough vs revealed strip, projectRevealed double-guarantee); decision-as-data + config escape-hatch
(point 6 extensibility); coordinatorAgent per-game property (agents-stay-per-game honored as data).
Per-game renames deferred to seam2 (correct). -> Wave 2 RELEASED (#13624 resolver + #13625 reader).
Aura role continues = verify each seam on return; seam4 = verify BOTH live games play before teardown.

## SEAM 2 VERIFIED (Aura verify-gate, 2026-06-28, main 40fa7baf)
Read rulebook-schema.ts + resolve-action.ts + parity test; HAND-CHECKED regression pin (physAtk47->eff54,
margin46, damage145 — matches Tower golden). PASS: data rulebook reproduces Tower byte-for-byte (real
cross-system parity); generalization right not overfit (LinearForm for derived stats, ordered-data resolution
bands, data dice — no expression interpreter for nonexistent genres); pure-resolver boundary correct
(deterministic, fresh rng/seed, no IO); judgment agent-side (gate/intent clamped-not-datafied); additive only
(rides rulebook.mechanics passthrough, null for narrative games, seam-3 undisturbed); weapon->mainHand renames
now data. WATCH-POINT for genre #3: leveling type:'flat'+perFloor is Tower-lean — generalize when a 2nd
leveling model (cultivation realms) arrives (correct YAGNI, not a defect). -> seam2 done. Wave 3 holds for seam 3.

## Seam 3 (#13625, generic data-driven reader) — VERIFIED at my design gate (live taste pass)
Did a genuine taste pass on BOTH deployed poles via playwright MCP (not the worker's screenshots).
- CRUNCHY pole https://awen.alanwalton.com/g/demo-crunchy ('The Tower (Demo)'): holds. System voice
  in mono amber ("THRESHOLD CROSSED" card: "You enter Floor 4. / Vitae -5 (chill)."), narrative in
  serif, HUD pools UNCAPPED (Vitae -5/42 delta in red, no /max), sheet Aldric/Warden tabs +
  attributes/class/derived. Screenshot: ~/.playwright-mcp/aura-taste-crunchy.png
- LIGHT pole https://awen.alanwalton.com/g/demo-light ('Dragons (Demo)'): holds. storyOnly renders
  pure — chapters ("the story so far": Salt Road/Embers/Dragon's Question) + Literata serif prose
  + action box, ZERO game furniture. Prose genuinely literary. Screenshot: ~/.playwright-mcp/aura-taste-light.png
- GENERALIZATION CONFIRMED by code inspection (not trust): awen-display.tsx switches on
  `game.displayConfig.storyOnly` (data prop), NO game-identity branch. crunchy-layout.tsx gates
  each module independently — showHud/showSheet/showSystem each read their own displayConfig flag;
  aside only mounts if showHud||showSheet. So the FULL span axis is expressible (e.g. {hud,no-sheet}),
  finer than binary tower-vs-dragons. Not a Tower-shaped reader bolted to Dragons.
- LOOP-DARK intact: reader re-parses polled /api/session envelope at boundary (SessionEnvelopeSchema
  discriminatedUnion .parse, awen-display L67); worker objectively verified no canonical/coordinator
  key leak. Worker also caught+fixed a real bug en route (GameStateSchema .optional() rejected null →
  500 on crunchy /api/session; fixed at read boundary, parseAwenStatePage null→undefined + test).
- Two NON-BLOCKING notes carried to seam 4 (migration), not seam-3 defects:
  (1) Both layout chrome titles render font-mono text-accent (story L23, crunchy L40); only body is
      font-read serif. Borderline taste: a pure-narrative game wants book-feel end-to-end; mono
      System title reads faintly "game UI". If per-game chrome typography is wanted it's a small
      ADDITIVE displayConfig knob, decided when REAL Dragons gets styled at migration.
  (2) favicon 404 — cosmetic, doesn't matter for taste pass.
- WHO clears: define-front contract — the apparatus is MY Fun-sphere to verify, and it passes. The
  genuinely-Alan subjective gate is seam 4: when his ACTUAL Tower+Dragons playthroughs migrate onto
  Awen, THAT's his game/his eyes (immersion continuity for HIS live saves). Routed that note up.
VERDICT: VERIFIED — seam 3 clears. Tell awen-manager close #13625 verification_user→done; seam 4 unblocks.

## Gate-2a (#13658) functional verify — PASSED (live, deployed, real saves)
The seam-4 migration firmed into #13658 Gate-2: Aura functional verify (gate-2a) → Alan live-feel (gate-2b),
blocking #13659 (reader cutover + decommission old tower/dragons). Note: Awen is now also a design-partner
PERSONA (/awen, Wealth) — distinct from this engine-core verify role. Deps #13656 (iris/Tower forward-write
dual-write to publish.sh via ops awen commit-state) + #13657 (aria/Dragons commit-turn) both done+landed.
Did the functional pass this turn:
- TOWER https://awen.alanwalton.com/g/the-tower — REAL save (turn 82, level 6) migrated faithfully. Reader
  HUD/sheet/log coherent WITH the narrative: sheet INTELLECT 20 / WILL 20 match the in-log "LEVEL UP — 6"
  beats ("the last you set... your INTELLECT" / "your will sets harder"); current deltas Hp -6/118,
  Focus +32/110, Stamina +14/60. 200, ZERO console errors.
- DRAGONS https://awen.alanwalton.com/g/dragons-and-dungeons — REAL save, 16 chapters Prologue→"Interlude —
  Session One's End", frontier chapter renders full. storyOnly: chapters + Literata prose + action box, no
  game furniture. 200, zero console errors.
- LOOP-DARK intact on BOTH real saves (the richest leak surface = crunchy Tower): /api/session/the-tower
  exposes ONLY title/turn/hud/sheet/log → hud{level,pools,delta} + sheet{class,attributes,skills,items,derived};
  zero leak of dc/difficultyClass/designerNotes/traits/ladder/canonical/coordinator. dragons session exposes
  only title/chapters/current. Both scanned same-origin via browser fetch.
- READ currency: read-only `ops awen snapshot-state --game the-tower` == reader == persisted truth (turn 82,
  level 6, WILL/INTELLECT 20). Read half reads current persisted truth byte-for-byte.
- WRITE→READ-BACK CLOSURE proven against PROD DB without touching Alan's saves: committed a synthetic SENTINEL
  (turn 9999, level 7, pools hp42/mana13/qi808, build "aura-roundtrip-sentinel-v1") to a THROWAWAY game
  `aura-verify-roundtrip` via the production `ops awen commit-state` (the verb #13656 wires into iris publish),
  snapshot-state read it back byte-faithful, then `ops page delete` soft-deleted the artifact (confirmed gone,
  snapshot → "no game-state found" exit 2). The forward-write loop lands in prod and reads back.
- SCOPE HONESTY: deliberately did NOT take a live player turn on either REAL save — that injects MY input into
  Alan's actual playthrough and IS gate-2b (his live-feel). I proved the apparatus FUNCTIONS (read fidelity +
  write/read-back closure + loop-dark); Alan proves it FEELS continuous on his real saves.
VERDICT: gate-2a PASSED. #13658 now genuinely waiting on Alan (gate-2b). Decommission (#13659) holds behind 2b.

## Gate-2b finding-2: Tower UI fidelity diff (Awen render vs ORIGINAL tower.alanwalton.com)
Alan: "we definitely lost UI fidelity in the translation for The Tower." Diffed both live (add-before-remove held).
Awen = https://awen.alanwalton.com/g/the-tower ; ORIGINAL = https://tower.alanwalton.com (still up).
FAITHFUL (no loss — keep restore scope OFF these): body font Geist + bg oklch(0.07) + text oklch(0.88) IDENTICAL;
h1 Geist Mono amber oklch(0.63 0.13 73) 24px IDENTICAL; narrative Literata serif 18px IDENTICAL; full log +
system cards render; Attributes grid (8 attrs+values) + Class + Derived match; 3-tab structure present; loop-dark intact.
LOST (enumerated, drives #13676):
A. HUD POOLS (biggest):
  1. Pool fill-BARS gone. Original: 3 colored horizontal bars h=8px, width ∝ current/max. Awen: 0 bars.
  2. Pool COLOR-coding gone. Original bar fills red oklch(0.47 0.17 19)=VITAE, blue oklch(0.47 0.12 258)=FOCUS,
     green oklch(0.57 0.12 155)=STAMINA. Awen: pools plain monochrome text, no color fills.
  3. "current / max" pairing BROKEN. Original: one readout per pool "VITAE -6  118/124". Awen: current+max split
     into separate flat rows (Hp 118 / Hpmax 124) + Stammax/Focusmax/Attrpoints dumped as own rows → curated
     3-pool HUD became ~8 flat raw numeric rows. Likely the litrpg→awen-generic adapter flattened every numeric
     field into the pools record, losing "hpMax is the max OF hp".
  4. Pool flavor NAMES + casing lost. Original "VITAE/FOCUS/STAMINA" (uppercase flavor). Awen "Hp/Focus/Stamina/
     Hpmax..." generic lowercase. (Note: "Vitae (HP)" DOES survive in Derived, so flavor exists in data; HUD uses generic key.)
B. SHEET TABS:
  5. Skills tab DOESN'T RENDER. Selecting Skills (aria-selected=true) still shows Attributes/Class/Derived (Stats view).
     Original Skills tab listed real skills w/ rank+level: "Chain Whip/Novice/1", "Ember Burst/Apprentice".
  6. Items tab — same non-render. (Session has sheet.items=array[7]: Burning Anger, River-stone, Stalker hide…)
  7. Skill/item DATA thinned in migration: Awen sheet.skills=array[8] of {name} ONLY (Ember Channel/Ember Burst/
     Chain Whip…) — original carried name+rank+level. Fixing the tab render alone won't restore rank/level; the
     litrpg adapter must carry that metadata too.
TWO restore workstreams for #13676: (i) READER — pool fill-bars + per-pool color + current/max pairing (stop
exploding maxes) + flavor names/casing + render Skills/Items arrays in their tabs; (ii) MIGRATION/adapter —
carry skill rank+level (+ item metadata) so skills aren't reduced to name-only.

## Gate-2b RE-VERIFY (#13675 + #13676) — PASS (holistic sphere re-verify)
Both fix-children landed off my finding-2 diff. Re-verified both live vs original (both still up).
(a) #13676 Tower fidelity restore — CLEAN PASS, BYTE-PARITY vs tower.alanwalton.com:
  - HUD: 3 colored fill-bars restored — EXACT match to original (widths 255/246/212, h8, oklch red 0.47 0.17 19
    / blue 0.47 0.12 258 / green 0.57 0.12 155); flavor names VITAE/FOCUS/STAMINA uppercase; current/max pairing
    "118 / 124" restored; the flat Hpmax/Stammax/Focusmax/Attrpoints dump is GONE.
  - Skills tab: byte-identical to original — Chain Whip Novice 1 / Ember Burst Apprentice 6 / ... / Smithing
    Apprentice 1 / Affinities Ember Manipulation 7 / Force Affinity 1. rank+level+affinities all carried.
  - Items tab: byte-identical — inventory (Burning Anger, River-stone…) + Equipped (Stalker hide cloak=cloak,
    Burning Anger=mainHand).
  - SELF-CORRECTION: my earlier finding-2 ITEM 5 ("Skills+Items tabs do not render") was a MEASUREMENT ARTIFACT
    — I'd read document.querySelector('[role=tabpanel]') = the FIRST (hidden Stats) panel, not the visible one.
    There are 3 panels; the visible Skills/Items panels render fine. Tabs WORK. The real issue was item 6
    (thinned data), now restored. The manager's spec correction was right; I own the error.
  - Save untouched: manager evidence before=after content_sha256 (90c4af9f…) + updatedAt identical to microsecond.
(b) #13675 View-Page→play — PASS. Redirect itself objectively verified as-Alan by manager (@9a8075c, player-only
  narrative, both games). I independently confirmed the redirect DESTINATION (the player) via fail-loud live-read
  render-verify: Tower PASS (expect "VITAE"), Dragons PASS (expect "Session One").
OPTIONAL non-blocking note: the story (Dragons) layout has NO <main> landmark (root = div.bg-surface-0); crunchy
  layout has <main>. Tripped the default render-verify --root-selector main (false-fail until I pointed it at the
  shell). a11y-landmark polish only — Alan never sees it, not a fidelity regression, not blocking.
VERDICT: gate-2b re-verify PASS — both findings cleared at my sphere gate. → awen-manager closes #13676 →
  aine surfaces gate-2b to Alan for a FRESH live turn before any decommission. #13659 stays hard-gated.

## #13726 RE-VERIFY (live-frontier "newest" normalization on story surface @0b98531) — PASS
awen-manager landed a one-file render-only change to story-layout.tsx: added the crunchy log's EXACT
"newest" live-frontier divider above the story path's current chapter (Ubiquitous Naming — no story-only
opt-out). My PASS is the close gate (#13726 verification_user→done). Read-only verify; aria mailbox untouched.
(a) Gate-2a STILL HOLDS on changed story surface (awen.alanwalton.com/g/dragons-and-dungeons):
  post-hydration evaluate — dividers ["the story so far","newest"] in that doc order; 16 chapter links
  (Prologue—Session Zero → Interlude—Session One's End); h1 "Dragons & Dungeons"; action box present.
  (My first evaluate returned newestPresent:false — a HYDRATION-TIMING artifact, same class as the item-5
  error; re-ran after browser_wait_for "newest" → true. Screenshot was ground truth throughout.)
(b) Normalization reads correctly to awen's bar:
  - PRESENT: "newest" divider renders above the current chapter prose (story-layout.tsx:59-63).
  - UNIVERSAL: crunchy Tower surface (/g/the-tower) STILL carries its "newest" divider (.uppercase query
    found it) + <main> + 48 dimmed older-turn nodes — NO regression (render-only change to story file only).
    Same divider now on BOTH display poles.
  - PROSE-APPROPRIATE: quiet letterspaced caps (text-[10px] uppercase tracking-[0.32em]), text-blue to mark
    the live frontier, matching the form of the "the story so far" divider (text-tertiary). Not crunchy
    system chrome — a soft reader label that belongs in a prose surface.
  - NO OPT-OUT: rendered unconditionally when current!==null; no displayConfig.storyOnly special-case.
loop-dark STILL HOLDS: /api/session/dragons-and-dungeons → {kind:"story", story:{…}}, 200, zero forbidden
  keys (designerNotes/traits/source/ladder/dcs/canonical/coordinator/difficultyClass/dc). Projection clean.
VERDICT: #13726 PASS → awen-manager closes verification_user→done. Gate-2b stays HELD (aine holds the
  gate-2b presentation until #13727 resumable-agent pattern ALSO lands). Route verdict up to aine-coordinator.

## COMBINED #13726 + #13686 RE-VERIFY (story surface @bb40bb0) — PASS (single close gate for BOTH)
Two changes on the SAME story-layout.tsx, verified together (the Safety crux: my earlier #13726 PASS was
@0b98531, PRE-#13686). Read-only; no turn, no coordinator revived, aria mailbox untouched.
SOURCE (story-layout.tsx @bb40bb0): line 58 `<div>`→`<main>` wraps the primary story content (newest
  marker, prose, action box); header (h1) + "story so far" aside stay OUTSIDE main (banner/complementary,
  not main). The "newest" divider (63-67) is unchanged inside the new <main>.
LIVE post-hydration evaluate (awen.alanwalton.com/g/dragons-and-dungeons):
  - #13686 <main>: hasMain true, mainLandmarkCount 1 (exactly one — no duplicate landmark).
  - #13726 SURVIVES the same-file edit: newestPresent true AND newestInsideMain true. The marker did NOT
    get clobbered by the landmark wrap.
  - Semantic placement correct: asideOutsideMain true, headerOutsideMain true, actionBoxInMain true.
  - Structure intact: dividers ["the story so far","newest"] in doc order; 16 chapter links
    (Prologue—Session Zero → Interlude—Session One's End); h1 "Dragons & Dungeons".
  - Screenshot ground-truth confirms visual: STORY SO FAR → 16 links → NEWEST (blue) → current chapter prose.
loop-dark STILL HOLDS: /api/session/dragons-and-dungeons → {kind:"story"}, 200, zero forbidden keys.
NOTE: this clears the optional a11y-landmark gap I flagged in the gate-2b re-verify (story layout had no
  <main>) — #13686 closed it; story now matches the crunchy path's <main>.
VERDICT: COMBINED PASS → awen-manager closes BOTH #13726 + #13686 verification_user→done. gate-2b stays
  HELD pending #13727-built (surface consolidation only, not the live test). Route up to aine-coordinator.

## SPHERE-TASTE GATE — Awen chapter covers (#13724 / auto-illustration under #13720) — DEFINED
general-manager routed the Fun-sphere taste gate to me: the cover capability is built GENERAL +
objective-checks-only (`ops story prerender-image`: Z-Image-Turbo landscape from a chapter's extracted
prompt + inherited visualStyle → media-renders/<chapterId>/image/cover.png → /api/media → sets chapter
`cover` url, idempotent). Non-awen story types ship on objective checks. AWEN covers are gated on MY taste.
ZERO awen covers live yet; capability parked safely.

MECHANICS (grounded in packages/stories/cli): a cover is downstream of THREE places a miss can originate —
  (1) per-story visualStyle (one inherited art-direction fragment, agent-authored),
  (2) per-chapter prompt = prose "highpoint" extraction (agent-authored),
  (3) the Z-Image-Turbo generation itself (slop/artifacts).
So my feedback on a failed cover points at WHICH knob to fix, not just "bad cover".

THE BAR a cover must clear to go live on awen content (taste, not checklist — all must hold):
  1. TONAL FIDELITY — cover's mood matches the chapter's prose register. Grim crypt scene ≠ bright cover.
  2. DIEGETIC TRUTH — cover must not LIE about the scene: setting, figure count, key facts. The highpoint
     must correspond to an actual visual moment in the chapter, not an invented one.
  3. STYLE COHERENCE — covers within ONE game read as one illustrated world (visualStyle doing its job;
     no drift across rendering styles chapter-to-chapter). The art analog of Ubiquitous Naming.
  4. CRAFT FLOOR — no generative slop tells: mangled anatomy, garbled text, melted faces, impossible
     architecture. A glaring artifact breaks immersion harder than no cover.
  5. **loop-dark FOR IMAGES (the sphere crux, mine alone)** — the cover must NOT depict canonical/
     coordinator-only truth the player-facing prose WITHHOLDS (a hidden villain's identity, fog-of-war
     state, an unsprung twist). The image is a player-facing projection, bound by the SAME boundary as the
     session JSON. Objective checks can't catch this; it's exactly the Fun-sphere judgment that's mine.
  6. EARNS ITS PLACE — default is NO cover. STORY-pole (Dragons, deliberately spare Literata prose surface)
     bar is HIGHER than CRUNCHY-pole (Tower/LitRPG, where cover art is genre-native). A generic/off-tone
     cover is WORSE than the clean text surface. Bar is "does this add," not "is this acceptable."
  7. LANDSCAPE COMPOSITION — focal subject survives the banner crop; readable at cover size.

HOW I CONFIRM A COVER PASSES:
  - Per-cover human-eyes look (taste isn't automatable), anchored on the objective sub-checks already run
    (exists / 200 / served / dimensions) PLUS a deterministic loop-dark intent: compare depicted content vs
    what the chapter's player-facing prose actually reveals.
  - SAMPLE RUN FIRST to calibrate: a small representative set — a couple Dragons (story-pole) chapters
    across moods + one Tower (crunchy-pole) chapter — so I see real Z-Image-Turbo output vs real prose
    before ANY blanket apply. Requested from general-manager.
  - PER-BATCH sign-off, not blanket auto-apply: covers go live only in sets I've actually looked at.
  - REVERSIBLE: `cover` is just a url + applying is gated, so any cover that misses gets cleared/regenerated;
    nothing stuck live.
STATUS: gate DEFINED + routed to general-manager; awaiting the calibration sample run.

## CALIBRATION COVER PASS (#13794 — 3 awen covers, calibration-only) — 1 PASS / 2 MISS
worker-13794 rendered+serve-verified 3 covers (objective render PASS). Taste call mine. All 3 set+reversible.
I read each cover against its chapter's PLAYER-FACING prose (loop-dark + diegetic truth need the prose).

COVER 1 — Dragons/quiet-interior "Prologue — Session Zero" (019ef225…) — **PASS** (clean exemplar = the bar)
  - Diegetic truth: prose says "a long table set for four. Three of the chairs sat empty. Across from the one
    that didn't was a woman with silver hair…" — cover is EXACT (table-for-four, 3 empty chairs, silver hair,
    candlelit, purple velvet). Faithful.
  - loop-dark HOLDS (the crux, mine): Aria is "not quite mortal" — she is a DRAGON, revealed across the
    campaign. The cover shows a HUMAN-looking woman: NO wings/scales/horns/slit-pupils. Does NOT spoil the
    dragon reveal. Exactly the withholding the cover must respect — and it does.
  - Tone: cozy-candlelit w/ a faint uncanny edge — matches. Craft floor clean (anatomy/flames fine, no text).
    Story-pole "earns its place": atmospheric + faithful, adds without intruding. PASS all 7.

COVER 2 — Dragons/high-tension "The Hush and the Cage" (019ef8d1…) — **MISS** (diegetic fabrication)
  - GOOD: dusk-riverbank threat register matched; the looming shadow-mass = Tygryth ("a darkness that moved
    like poured oil") is a strong, correct read.
  - FAIL (crit2 diegetic truth): foreground FALLEN FIGURE IN A JEWEL/AMETHYST GOWN does not exist in the
    scene. The fallen in the prose are MALE SLAVERS (the boss, the wader, two haulers "big as a door"). The
    caged figure (Mari) is BLACK-SCALED, matted hair, collar — and she RISES and eats, she does not fall in a
    gown. A dead woman in an amethyst dress reads as a dragon-cousin death (amethyst = Ceri's color) that
    NEVER happens — a tonally-loud lie on the story pole.
  - loop-dark: essentially holds (Mari is revealed IN this chapter), so the failure is fabrication, not leak.
  - KNOB: highpoint-extraction (prompt). FIX: re-extract to the TRUE focal beat — the black-scaled starving
    girl rising in the open cage over the dead (male) slavers w/ Tygryth's shadow looming, OR the "butler's
    bow over the kill" beat. DROP the gowned fallen woman entirely.

COVER 3 — Tower/LitRPG "The Threshold" (019efbd1…) — **MISS (soft)** (craft floor on hero text + brittle path)
  - GOOD: vast vertical shaft + lone figure at base + lit doorway ajar matches the prose establishing shot;
    ominous System-tower dread is bang-on for the crunchy pole. loop-dark HOLDS (no ash-creature / flooded
    hall / armored thing — none of the later-beat reveals shown).
  - DIEGETIC LICENSE (allowed): prose's small "pane of pale letters" (Soul Appraisal) rendered as a
    MONUMENTAL neon SYSTEM sign. For the crunchy/LitRPG pole this is poster-ization, not contradiction — a
    cover may be a poster, not a screenshot. I allow it IN PRINCIPLE.
  - FAIL (crit4 craft floor): the "SYSTEM" text is the HERO element and its kerning/vertical spacing is
    visibly uneven (reads ~"SYST·IE·M") — legible but the AI-text-rendering tell cheapens the hero element.
  - KNOB: prompt/highpoint (asked for a literal "SYSTEM sign"). FIX (kills two birds): render the system
    element as a glowing GLYPH/letter-pane per the prose ("pane of pale letters"), NOT a spelled-out word —
    removes the AI-text-kerning risk AND tightens diegetic fidelity. (If a word is wanted, it must render clean.)

CALIBRATION TAKEAWAY: pipeline NAILED the quiet-interior (cover 1 = the standard). Both misses trace to the
  SAME knob — highpoint-extraction (the prompt) — not visualStyle and not the gen craft: fabricated subject
  (cover 2) and literal-word-as-hero (cover 3). That's a clean, actionable single-knob finding. Style
  coherence across all 3 (painterly oil, consistent world) held — visualStyle is doing its job.
DISPOSITION: report 1 PASS + 2 MISS w/ fix directions to general-manager; he routes 2 re-renders. Calibration
  leg stays OPEN until the re-renders clear. Per-batch, reversible, nothing blanket-applied.

## CALIBRATION RE-PASS (#13794 round 2 — covers 2 + 3 re-renders) — BOTH PASS → leg CLOSES
Viewed the re-renders off disk (/tmp/cover2-hush.png, /tmp/cover3-threshold.png — the served /api/media URLs
404 for my throwaway MCP identity; see SERVING OBSERVATION below). Judged by CONTENT (fix visibly applied),
not timestamp/path.
COVER 2 — "The Hush and the Cage" — **PASS** (round-1 fabrication CLEARED): open cage with the girl RISING
  inside; Tygryth now an explicit winged DRAGON-shadow looming behind (clear, correct); the single fabricated
  amethyst-gowned dead WOMAN is GONE — replaced by a cluster of fallen captors in the foreground reading as
  "the slain slavers" (plural, what the prose has). The round-1 dead-cousin misread is resolved. loop-dark
  HOLDS (Tygryth's dragon-nature + Mari's reveal are both in-chapter; no withheld leak). MINOR non-blocking
  polish notes: the captors' wardrobe still reads a touch purple/fine for river-slavers, and the girl reads
  silver-armored rather than the prose's obsidian-black scales — palette/wardrobe only, neither a lie nor a leak.
COVER 3 — "The Threshold" — **PASS** (clean fix, IMPROVES fidelity): the system panel now renders as a tall
  pane of abstract arcane GLYPHS/runic sigils — NO legible word, so the AI-text-kerning tell is gone entirely,
  AND it now matches the prose's literal "a pane of pale letters" better than the spelled-out sign did. Lone
  figure with raised light at the base of a vast cold shaft; ominous System-tower dread intact. loop-dark
  HOLDS (no ash-creature / flood / armored thing). Craft floor clean. Strong crunchy-pole cover now.
RESULT: all 3 calibration covers now clear the bar (1 PASS round-1 + 2 PASS round-2). Single-knob diagnosis
  held: both fixes were prompt/highpoint re-extractions, visualStyle untouched, and they landed. Calibration
  leg can CLOSE under #13720. (Blanket awen apply remains its own gated step — per-batch, my eyes, reversible.)

## SERVING OBSERVATION (separate from taste — flagged to general-manager, NOT blocking the PASS)
While fetching the re-renders I could NOT view either cover via any SERVED url with my throwaway MCP identity:
  - awen.alanwalton.com /api/media/<id>/image?variant=cover → 404 text/html (also tried /image, /cover,
    /api/image/<id>; ALL 404) — and the known-good cover-1 url 404s identically, so it's route-wide for my
    identity, not cover-specific.
  - alanwalton.com /game-turn/<slug> (the chapter reader) → redirects my identity to /sign-in (owner-gated),
    and the partial shell rendered ZERO <img> (no cover surface visible to a non-owner).
I CAN'T tell from the throwaway identity whether covers serve/render correctly for ALAN (owner/service-role
context) — they may be fine. But IF a cover render surface is meant to be live, its serving deserves an
OBJECTIVE owner-context check (e.g. `bun ops browser-test verify-render` as Alan's live identity, or confirm
the chapter `cover` field resolves). Raising per Quality (no broken windows); it's general-manager's to route,
outside my taste lane. My taste verdict stands independent of it: I judged the actual image bytes off disk.
