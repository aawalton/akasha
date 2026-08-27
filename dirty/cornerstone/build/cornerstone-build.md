---
pageType: story-build
slug: cornerstone-build
title: Cornerstone — Build
bodyField: build
story: cornerstone
chapterNumber: 0
level: 1
className: The Waking Stone — Blind
gameSystem: >
  # The Waking Stone — Game System


  You are a buried settlement-core: a half-sentient heartstone that perceives
  the world only through the land bound to it and acts only by shaping what is
  built upon it. You do not have classes, HP, or skills. You have **Faculties**
  — senses and powers that wake, one structure at a time. Your mind and your
  domain grow together: the stronger the town, the more of you is awake.


  ## Faculties (the stat set)


  Six Faculties. **Touch is innate**; the other five are dormant until a
  structure awakens them. Each Faculty has a **Depth** (its stat level).


  | Faculty | Awakened by (structure family) | Governs |

  |---|---|---|

  | **Touch / Presence** *(innate)* | — (you wake with it) | Direct physical
  contact with the bound soil: footsteps, digging, the weight of a wagon, a
  foundation laid. Caps at Depth 3. |

  | **Sight** | a vantage (watch-cairn, lookout, tower) | Perception *beyond*
  the soil — the land, approaching figures, weather, the horizon. |

  | **Warmth** | a gathering-hearth (common fire, hearth-hall) | The *inner
  state of people* — moods, needs, health; who is content and who is quietly
  leaving. |

  | **Provision** | a **surface store** (storehouse, granary, larder, cellar,
  shallow draw-well) | *Resources & scarcity* — what the land yields above and
  what is held: filling, emptying, the dwindle of stores, the coming of want. |

  | **Memory** | a keeping-place (marker-stone, shrine, archive) | The core's
  own *continuity* — holding what it learns across time, recalling the dead and
  the town's story; also the thread back toward who it once was. |

  | **Reach** | a **deep-driven work** (borehole, mineshaft, deep foundation,
  delvings) | The *extent of the bound land* — how far the core's body stretches
  underground and out. Deepening Reach literally grows the domain. |


  > **Provision vs Reach:** a structure awakens **Provision** when its signature
  is *what is gathered above and stored* (filling, emptying, the dwindle of
  stores → scarcity); it awakens **Reach** when its signature is *downward /
  outward extent* (driving deep, widening the bound land). A shallow draw-well
  sits on the Provision side; deep-driven works (borehole, mineshaft, delvings)
  sit on Reach.


  ### Depth scale (what a Faculty's level means)

  - **0 — Dormant.** No perception or action in this domain at all.

  - **1 — Stirred.** A dim, unreliable trickle: the broad fact (someone is sad)
  but no detail.

  - **2 — Open.** Reliable present-tense perception across the immediate
  settlement.

  - **3 — Keen.** Fine detail and slight anticipation (senses scarcity a few
  days out).

  - **4 — Deep.** Perception reaches beyond the walls / into subtler layers, and
  the Faculty can begin to **act**, not just perceive (Warmth-4 can soothe a
  nightmare; Reach-4 can shift soil).

  - **5 — Profound.** Mastery; the Faculty becomes **fusion-ready**
  (prerequisite for fusing it into a higher Power via Research). *(Touch caps at
  3.)*


  Each +1 Depth widens range, sharpens detail, and at the higher steps adds a
  small active capability. Specific numbers per Faculty are designed
  just-in-time.


  ## Wakefulness — the level/tier scale


  **Wakefulness Score (W)** = the sum of all Faculty Depths (Touch included). It
  is the core's overall "level." Max possible = 28 (Touch 3 + five Faculties ×
  5).


  | Tier | W | Meaning — what the core *is* at this tier |

  |---|---|---|

  | **Blind** | 1 | Only innate Touch. Perceives only direct contact with its
  own buried soil. *(The chapter-0 / opening state.)* |

  | **Aware** | 2–5 | First true sense(s) woken. The core knows it is a *place*,
  not a point; perceives the immediate settlement. |

  | **Watchful** | 6–11 | Several senses open; perceives *beyond* its own soil
  and begins to lightly act. The town is a real, defensible settlement. |

  | **Knowing** | 12–19 | Faculties run deep; the core anticipates and acts
  deliberately. **First fused Powers appear.** The town is established. |

  | **Dreaming** | 20+ | Fully awake; can project will and imagination — shape
  weather, dream futures, guide from afar. The endgame guardian-spirit of the
  place. |


  **Power-curve shape:** tier bands widen as you climb (Aware 4 ch → Watchful 6
  → Knowing 8 → Dreaming 10), so tier-ups *decelerate* — each tier is a longer,
  harder climb than the last. A mid-game **Knowing** milestone (≈ch11) means:
  every sense awakened, several deep, and the first fused Power within reach.
  (Sim-validated tier landings: Aware ch1 · Watchful ch5 · Knowing ch11 ·
  Dreaming ch19.)


  ## Progression Cadence (the decision contract)


  Each chapter ends on **exactly one** reader decision. Its **type is selected
  deterministically from build-state** by this priority — decisions fire because
  state crossed a threshold, never because a chapter felt like pausing. (All
  three store as decisionType `other`.)


  1. **BUILD — awaken a new Faculty** *(+1 W: a dormant Faculty 0→1)*
     Fires when **any awakenable Faculty is still dormant AND no Faculty currently sits un-anchored at Depth 1.** The reader chooses *which sense wakes next* by choosing what structure the settlers raise. Dominant in Blind/Aware.
  2. **RECRUIT — a townsfolk anchors a Faculty** *(+1 W: a Faculty at Depth 1–2
  → +1, marked anchored)*
     Fires when **a newly-woken Faculty sits un-anchored at Depth 1–2 and a fitting newcomer has arrived.** The reader chooses *who* becomes the living focus that sharpens that sense. The natural "wake it, then root it" beat after a BUILD.
  3. **RESEARCH — deepen or fuse Faculties** *(deepen = +1 W; FUSE = +0 W but
  unlocks a named Power)*
     The **fallthrough**: fires when neither BUILD nor RECRUIT is legal. The default research action **deepens** a chosen Faculty by +1 W. **When ≥2 Faculties are at Depth ≥3, a FUSE option becomes available** as the research choice — fuse two senses into a higher Power (Sight+Memory → Foresight; Warmth+Provision → Stewardship). Dominant in Knowing/Dreaming.

  **Macro shape:** early game is BUILD-dominant (waking senses), mid game
  interleaves BUILD/RECRUIT (rooting and rounding out), late game is
  RESEARCH-dominant (fusing into Dreaming-tier Powers) — a sleeping stone
  becoming a dreaming guardian.


  *(Full Faculty sub-trees, the complete Power/fusion list, specific building
  rosters, and per-Faculty numbers are deferred and designed just-in-time as
  chapters reach them.)*
---
# Cornerstone — Live Build (The Waking Stone)

**Tier:** Blind · **Wakefulness Score (W):** 1 / 28 · **Build current as of:** chapter 0 (pre–chapter 1)

## Faculties
| Faculty | Depth | Anchored | Notes |
|---|---|---|---|
| Touch / Presence *(innate)* | 1 | — | Caps at 3. Direct contact with the bound soil. |
| Sight | 0 (dormant) | — | Awakened by a vantage. |
| Warmth | 0 (dormant) | — | Awakened by a gathering-hearth. |
| Provision | 0 (dormant) | — | Awakened by a store. |
| Memory | 0 (dormant) | — | Awakened by a keeping-place. Also the thread back toward the past life. |
| Reach | 0 (dormant) | — | Awakened by a deep-driven work. Grows the domain. |

## Powers (fused)
None yet.

## Structures
None raised yet.

## Townsfolk
The first settlers are only just arriving — unknown to the core, felt only as pressure and vibration in the soil.

## Perception right now
- **CAN:** only direct physical contact with its own buried soil — footsteps, the bite of a shovel, the weight of a wagon, the first foundation pressed above.
- **CANNOT yet:** see anything; know who the people are or what they feel; sense resources or scarcity; reliably remember (even its own past-life self); reach beyond its buried footprint.

