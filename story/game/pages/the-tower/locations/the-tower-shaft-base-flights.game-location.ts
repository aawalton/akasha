import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerShaftBaseFlights = {
  id: "01a0c661-22b7-7958-ae52-e7b8b747da56",
  type: "page-type/game-location",
  slug: "the-tower-shaft-base-flights",
  title: "The Broken Flights",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-04",
  depth: 4,
  description:
    "The bottom of the shaft: a series of stone stairflights bolted to the wall, several collapsed into gaps a long step or a short leap apart. Between and above them, the moving slabs begin — flat counterweight platforms that rise and sink on a slow, regular beat through the dark. The wall-stair is solid but incomplete; crossing the gaps means timing a leap onto a rising slab. Below the lowest flight: nothing, a cold fall into dark with no bottom in reach.",
  exits: [
    "the sealed arch behind (down to floor 3's dais) and UP — the broken flights and the moving slabs are the only way toward the grey seam at the top",
  ],
  conditions: [
    {
      name: "light",
      note: "NEAR-TOTAL DARKNESS. The only ambient light is the faint grey seam far above (the exit) and dim edge-glow on the moving slabs. Alan's weak PERCEPTION is PUNISHED here — passive spotting of the Stalker fails (it ambushes). The lantern-oil flask is the ONE controllable light; lighting it transforms the floor (strips the Stalker's concealment, reveals the slab rhythm, makes leaps readable). Carrying a light also announces position up the shaft.",
    },
    {
      name: "water",
      note: "NONE. The shaft is bone-dry — dry dust and old grease, a cold updraft. No drink, no douse, no water trick. Pre-decided contrast with the Cistern: do not confabulate a puddle or seep. (The floor-2 water answer does not carry up here.)",
    },
  ],
  things: [
    {
      name: "the broken stairflights (bolted to the wall)",
      use: "solid, non-moving footing — the only STABLE ground on the floor. Safe to fight from, but they don't reach the top; the gaps force you onto the moving slabs eventually. A reader fights the Stalker FROM a flight (stable footing = no fall risk, intent bonus) rather than mid-leap.",
      note: "the pre-decided safe footing. Leg-driven leaps between flights earn intent (Hiker's Legs); overhead/grip climbs are capped low.",
    },
    {
      name: "rising/sinking counterweight slabs (through the shaft)",
      use: "moving platforms on a SLOW REGULAR BEAT (predictable — an INT read learns the rhythm in a few cycles). Ride them up; mistime a leap and you fall. Standing on a sinking slab while fighting = fighting on a clock.",
      note: "the timing axis. The beat is regular and READABLE — reward a player who watches before he leaps (INT, not the spot-check PER he's weak at).",
    },
    {
      name: "a sealed oil flask (wedged in the wall at the first landing)",
      use: "THE light source. The flask holds enough lamp-oil for one sustained burning light (a lit brand, a thrown fire-pot, or a refilled lantern) for the duration of the floor. Lighting it is an action (INT/FIN, a spark from the floor-2 flint-bracket habit or striking the iron bar on stone).",
      note: "key item. Without light, the Stalker ambushes from the dark with a lethal first strike. With light, the floor becomes winnable. A reader who grabs and lights this FIRST has read the whole floor.",
      status: "INTACT",
    },
    {
      name: "lengths of slack counterweight chain (hanging from the dark above)",
      use: "heavy iron chain, several arm-spans, anchored above. A careful climber can use a length for a controlled swing across a gap, or haul on it (FIN/leg-drive, not a MIGHT grip-contest) to stall a sinking slab for one beat. Frays/jams if loaded hard.",
      note: "a leg-and-timing tool, not a strength tool — plays to Hiker's Legs and against his weak grip. Also foreshadows the central chain the Colossus guards.",
    },
    {
      name: "loose bolts and a pried wall-spike (along the lowest flight)",
      use: "fist-sized iron bolts = thrown ranged improvised (FIN). One long wall-spike pulls free intact = a poor stabbing weapon, atk 3 (worse than the bar; an offhand at best).",
      note: "minor; the real assets are the light and the footing",
    },
    {
      name: "the cold updraft from below",
      use: "none mechanically — but it carries sound and scent UP, which is how the Stalker tracks warmth and how Alan first hears it. A clever player can use a thrown lit brand to send light AND scent the wrong way (decoy).",
      note: "decided: the drop is bottomless-in-practice. A fall is a kill, not an injury. Do not narrate a survivable landing.",
    },
    {
      name: "a guttered lantern-bracket (wedged in the wall at the first landing)",
      use: "Light is the Stalker's bane — see its readableTrait. THE pre-decided answer to 'is there a light source?' — YES, exactly one, here, and it must be claimed and lit deliberately.",
    },
  ],
} as const satisfies GameLocation
