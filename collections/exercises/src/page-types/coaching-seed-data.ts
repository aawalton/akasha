export interface EquipmentSeed {
  readonly title: string
  readonly category: string
  readonly configuration: string
  readonly loads: string
  readonly available: boolean
  readonly notes: string
  readonly sortOrder: number
}

export interface ConstraintSeed {
  readonly title: string
  readonly kind: string
  readonly focusTags: readonly string[]
  readonly body: string
  readonly sortOrder: number
}

export interface MobilitySeed {
  readonly metric: string
  readonly date: string
  readonly side: string
  readonly context: string
  readonly valueText: string
  readonly valueNum?: number
}

export const EQUIPMENT_SEED: readonly EquipmentSeed[] = [
  {
    title: "Dumbbells",
    category: "dumbbells",
    configuration: "pair",
    loads: "3,5,8,10,15,20,25,30",
    available: true,
    notes: "Standard + light DB pairs, one continuous ladder.",
    sortOrder: 1,
  },
  {
    title: "Kettlebells",
    category: "kettlebells",
    configuration: "single",
    loads: "5,10,15",
    available: true,
    notes: "Single bells.",
    sortOrder: 2,
  },
  {
    title: "Adjustable Bench",
    category: "bench",
    configuration: "adjustable",
    loads: "",
    available: true,
    notes: "Flat + incline.",
    sortOrder: 3,
  },
  {
    title: "Weighted Vest",
    category: "vest",
    configuration: "n-a",
    loads: "",
    available: false,
    notes:
      "Proposed purchase (discretionary income) — unlocks hands-free leg loading " +
      "(squats/lunges/step-ups/Bulgarians) without arm-capping. Not owned yet.",
    sortOrder: 4,
  },
]

export const CONSTRAINT_SEED: readonly ConstraintSeed[] = [
  {
    title: "Overhead mobility ~50% — no forced lockout",
    kind: "programming-cue",
    focusTags: ["push"],
    body:
      "Strict wall-slide reaches ~50% to full overhead before losing contact. Don't force full " +
      "overhead lockout in pressing — it drives a lumbar arch. Lead push with horizontal pressing " +
      "(DB bench / floor press); do overhead only in pain-free range, ribs-down/braced, or sub an incline press.",
    sortOrder: 1,
  },
  {
    title: "Horizontal pressing is elbow-safe",
    kind: "programming-cue",
    focusTags: ["push"],
    body:
      "Right elbow stays clean through all horizontal pressing (DB bench, incline, close-grip) — " +
      "safe relative to the curl trigger.",
    sortOrder: 2,
  },
  {
    title: "30 lb DB ceiling — actively out-repping",
    kind: "equipment-ceiling",
    focusTags: ["push", "pull"],
    body:
      "Dumbbells top out at 30 lb pairs. Alan is now out-repping the 30s on bench " +
      "(12→16→20 reps over 2026-06-22→25). Progress via reps then heavier DBs. The heavier-DB-vs-" +
      "fitness-center decision is pending and near — raise it.",
    sortOrder: 3,
  },
  {
    title: "Count alternating/unilateral work by TOTAL",
    kind: "ef-accommodation",
    focusTags: ["all"],
    body:
      "Cue alternating/unilateral movements as a single total count (e.g. 20 total = 10/leg) and log " +
      "reps as the total — Alan loses track of per-side counts (executive-function accommodation).",
    sortOrder: 4,
  },
  {
    title: "Air quality is a hard medical gate",
    kind: "medical-gate",
    focusTags: ["all"],
    body:
      "Subliminal asthmatic bronchitis: exerting with particulates in the air can trigger a weeks-long " +
      "flare. Poor AQI → NO outdoor cardio/exertion, full stop. Check the current air quality reading " +
      "before ever recommending outdoor work; on bad-air days pivot to indoor respiratory-safe movement only.",
    sortOrder: 5,
  },
  {
    title: "Right elbow — watch curls",
    kind: "injury-watch",
    focusTags: ["pull"],
    body:
      "Mild right-elbow pain first surfaced on hammer curls (15 lb) 2026-06-19; clean since. " +
      "Curls / elbow-loaded movements are the trigger to watch — if it recurs, prefer elbow-friendlier " +
      "pulls and trim curl volume/load.",
    sortOrder: 6,
  },
  {
    title: "Joint swelling — back off on flare days",
    kind: "injury-watch",
    focusTags: ["all"],
    body:
      "Systemic joint swelling flares when sick or after repetitive fine-motor motions. On flare/run-down " +
      "days back all the way off (longevity #1). Avoid high-rep, fiddly, repetitive movements that aggravate joints.",
    sortOrder: 7,
  },
  {
    title: "Legs aren't strength-limited at home loads",
    kind: "programming-cue",
    focusTags: ["legs"],
    body:
      "Hiking base → strong legs; bilateral home-load squats aren't strength-limited (grip/arms + breathing " +
      "cap goblet work first). Load legs via unilateral work (reverse lunge, split squat, Bulgarian, single-leg " +
      "RDL, step-ups), higher reps, and tempo/pauses. A weighted vest/ruck is the proposed unlock for true " +
      "hands-free leg loading.",
    sortOrder: 8,
  },
  {
    title: "Bilateral hinges are low-back-limited",
    kind: "programming-cue",
    focusTags: ["legs"],
    body:
      "On bilateral spinal-loaded hinges (RDL / good-morning) Alan's low back rounds before the hamstrings give " +
      "out, capping ROM. Keep load conservative and ROM within back tolerance; this reinforces the posterior-chain " +
      "mobility priority.",
    sortOrder: 9,
  },
  {
    title: "Pre-decide the workout — one set at a time",
    kind: "ef-accommodation",
    focusTags: ["all"],
    body:
      "AuDHD / executive-function: carry the decision-load. Workouts arrive pre-decided — no menus, no mid-session " +
      "choices. Present one set / one movement at a time; the win is showing up and starting.",
    sortOrder: 10,
  },
  {
    title: "Post-workout: protein drink + creatine",
    kind: "programming-cue",
    focusTags: ["all"],
    body:
      "At the end of EVERY workout, prompt Alan for the Orgain plant-protein shake (20g protein) + 3-5g creatine. " +
      "Protein is a hard macro for him; the workout-end is the cue. Standing cue — don't drop it.",
    sortOrder: 11,
  },
  {
    title: "Beat Saber re-cue (upper days; rest on legs)",
    kind: "programming-cue",
    focusTags: ["push", "pull", "upper", "legs"],
    body:
      "Optional Beat Saber re-cue on either upper day; guaranteed rest from it every legs day (overtraining guard). " +
      "Keep the VR headset on its charger as home-state so a dead battery never blocks the cue.",
    sortOrder: 12,
  },
]

export const MOBILITY_SEED: readonly MobilitySeed[] = [
  {
    metric: "forward-fold",
    date: "2026-06-20",
    side: "n-a",
    context: "warmup",
    valueText: "fingertips mid-shin → 3/4 down shin (20-30s hold, good intra-hold release)",
  },
  {
    metric: "forward-fold",
    date: "2026-06-23",
    side: "n-a",
    context: "cooldown",
    valueText: "lower shin, 3/4 down (started lower than 6-20)",
  },
  {
    metric: "forward-fold",
    date: "2026-06-24",
    side: "n-a",
    context: "warmup",
    valueText: "started 1/2 down (mid-shin) → eased to 3/4 down",
  },
  {
    metric: "supine-slr",
    date: "2026-06-19",
    side: "left",
    context: "standalone",
    valueText: "~45° straight-leg raise (well below ~80° normal)",
    valueNum: 45,
  },
  {
    metric: "supine-slr",
    date: "2026-06-19",
    side: "right",
    context: "standalone",
    valueText: "~45°, tighter than left (~5/10 stretch vs left at the same angle)",
    valueNum: 45,
  },
  {
    metric: "wall-slide-overhead",
    date: "2026-06-22",
    side: "n-a",
    context: "standalone",
    valueText:
      "~50% to full overhead with strict contact (cheats via lumbar arch when not enforced)",
    valueNum: 50,
  },
  {
    metric: "hamstring-lr-gap",
    date: "2026-06-19",
    side: "n-a",
    context: "standalone",
    valueText: "Right hamstring tighter than left (~5/10 stretch R vs L at 45° SLR)",
  },
]
