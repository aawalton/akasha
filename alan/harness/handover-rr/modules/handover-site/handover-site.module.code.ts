export const LOGIN_ORIGIN = "https://alanwalton.com"

export const MINT_PATH = "/handover/mint"

export const PERIPHERAL_PARAM = "peripheral"

export const RETURN_PARAM = "next"

export const CODE_PARAM = "code"

export type HandoverSite = {
  readonly name: string
  readonly origin: string
  readonly sessionKeyEnv: string
  readonly landingPath: string
  readonly signInPath: string
  readonly homePath: string
}

export type Peripheral = {
  readonly origin: string
  readonly landingPath: string
}

export const PERIPHERALS = {
  "archive-of-worlds": { origin: "https://archiveofworlds.app", landingPath: "/handover" },
  atlas: { origin: "https://atlas.alanwalton.com", landingPath: "/handover" },
  temper: { origin: "https://tempereso.com", landingPath: "/handover" },
} as const satisfies Readonly<Record<string, Peripheral>>

export function peripheralNamed(name: string | null): Peripheral | null {
  if (name === null || name === "") return null
  if (!Object.hasOwn(PERIPHERALS, name)) return null
  return (PERIPHERALS as Readonly<Record<string, Peripheral>>)[name] ?? null
}

export function handoverStartAt(site: HandoverSite, back: string): string {
  const asking = new URLSearchParams()
  asking.set(PERIPHERAL_PARAM, site.name)
  asking.set(RETURN_PARAM, back)
  return `${LOGIN_ORIGIN}${MINT_PATH}?${asking.toString()}`
}

export function handoverLandingAt(peripheral: Peripheral, code: string, back: string): string {
  const carrying = new URLSearchParams()
  carrying.set(CODE_PARAM, code)
  carrying.set(RETURN_PARAM, back)
  return `${peripheral.origin}${peripheral.landingPath}?${carrying.toString()}`
}
