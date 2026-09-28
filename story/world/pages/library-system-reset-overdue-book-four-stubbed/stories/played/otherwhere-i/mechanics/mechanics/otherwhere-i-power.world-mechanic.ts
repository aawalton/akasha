import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIPower = {
  id: "01a0e366-6650-726d-ae03-5c2c5eadb40b",
  type: "page-type/world-mechanic",
  slug: "otherwhere-i-power",
  title: "Power, Connection and Strength",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  description:
    "The Library's power is kept on Links's otherwhere-power page, from nought to 100, and starts at 3; a gain past 100 is lost. Unsynced, it loses 1 each turn in which an hour or more passes; at nought the Library vanishes and everything it holds is lost, which is the game's one unrecoverable loss. Her first touch of the core that she accepts links her tentatively: connection 1, strength 1, power drain halted, power +10, the interface opens. Power rises by 2 for each small engorged bookworm dealt with, by 10 for the big one at the back steps, by 3 for each bookworm dried with salt and kept alive for the night owls rather than killed, by 1 for each lost book reshelved or returned, and by 1 for each patron served once the doors open; it falls by what Links spends (5 to pull her clear, 3 to make himself solid for a scene), by each great working's cost as the world builder sets it, and by what her failures break. At 25 the Library leaves Emergency Power Mode, the alarm stops and the kitchen wakes; at 50 the golems wake; each branch then opens only when the Library states its requirements met. Connection is her link's depth, raised by 1 at each synchronization the Library asks for, which it asks only when power has risen 20 since the last; each synchronization raises her strength by 1 and her mana maximum by 2, and costs what otherwhere-magic states. Strength also rises by 1 for every three powers she has learned. Strength and connection are stated by the Library only when a task asks for them. Write each change onto its page and a history line before the turn advances.",
} as const satisfies WorldMechanic
