import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereCombat = {
  id: "01a0e365-d081-70b9-9f54-c09cd671e350",
  type: "page-type/world-mechanic",
  slug: "otherwhere-combat",
  title: "Combat and Injury",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "A fight runs in exchanges, one per turn beat, until one side is down, flees or the fight is stopped. Each exchange, her declared act is an otherwhere-action-check against a band set by the foe (a small engorged bookworm standard, the big one at the back steps hard); a foe's attack on her is an otherwhere-action-check the foe makes against her band for dodging or blocking, standard unless she has cover, reach or a plan. A landed blow is settled by otherwhere-harm with --dice 1d6: force is light for bare hands or a broom, solid for a heavy tool or a braced strike, heavy for a big creature's bite or crush, crushing for what would kill outright; ward is what stands between, from nought for skin to six for thick hide. The big engorged bookworm bites heavy with ward 2, and the small ones bite solid with ward 0. Salt is not a blow: an act that gets salt onto a bookworm shrinks it, taking from its health a die of harm at solid force with no ward, and a bookworm driven to nought by salt is dried and helpless rather than dead. Every change in health is written onto that character's otherwhere-health page and a line of its history before the turn advances; a new foe is filed as a character-other with its own health page first (a small engorged bookworm has 12, the big one 30). At nought health she is down: unconscious, and at the mercy of whatever remains; Links pulls her clear once a fight if the Library has power to spare, at a cost of 5 power. Health comes back 2 a turn of real rest with food, and all of it after a night's sleep; the Library's kitchen and hospital restore faster once they are open. A foe's hurt shows in the prose as it grows, never as a number.",
} as const satisfies WorldMechanic
