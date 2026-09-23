export type Pool = "hp" | "focus" | "stamina"

export type Element = {
  readonly element: string
  readonly sense: string
  readonly matched: string
  readonly pool: Pool
  readonly backlash: number
  readonly lingers: string | null
}

const AFFINITY_ELEMENTS: readonly Element[] = [
  {
    element: "ember",
    sense: "warmth, a live ember, and heat-stress in a material",
    matched: "fire, heat, ignition and scorching, and reading a weakness to heat or dry rot",
    pool: "hp",
    backlash: 12,
    lingers: null,
  },
  {
    element: "alchemy",
    sense: "what is reactive, what corrodes, and what dissolves what",
    matched: "caustics, poison, solvents and reagents, and reading a weakness to chemistry",
    pool: "hp",
    backlash: 8,
    lingers: "a caustic sting, and two turns of slower recovery",
  },
  {
    element: "sound",
    sense: "a space by its echoes, and tension or resonance heard",
    matched: "sound, resonance and staggering, and reading a weakness to resonance",
    pool: "focus",
    backlash: 25,
    lingers: "ringing ears, and two turns of dulled initiative and perception",
  },
  {
    element: "mind",
    sense: "thought-pressure, intent, and mental strain nearby",
    matched: "acts of mind and will, and resisting or reading a threat to the mind",
    pool: "focus",
    backlash: 30,
    lingers: "confusion, and a will check or the next read is lost",
  },
  {
    element: "dark",
    sense: "low light seen through, and what is unlit or concealed",
    matched: "stealth, dark and shadow, and reading a weakness in a hunter of the dark",
    pool: "focus",
    backlash: 15,
    lingers: "swimming sight, and two turns of dulled perception",
  },
  {
    element: "force",
    sense: "load, tension, and stored mechanical energy",
    matched: "leverage, release and momentum, and reading a weakness in a mechanism",
    pool: "stamina",
    backlash: 10,
    lingers: "a recoil stagger, and footing lost or the next act halved",
  },
]

export function elementAt(element: string): Element | undefined {
  return AFFINITY_ELEMENTS.find((one) => one.element === element)
}
