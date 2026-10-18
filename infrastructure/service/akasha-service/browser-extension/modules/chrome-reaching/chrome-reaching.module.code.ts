export type Tab = { readonly id?: number }

export type Sender = { readonly tab?: Tab }

type Area = {
  readonly get: (key: string) => Promise<Readonly<Record<string, unknown>>>
  readonly set: (items: Readonly<Record<string, unknown>>) => Promise<void>
  readonly remove: (key: string) => Promise<void>
}

type Heard<Listener> = { readonly addListener: (listener: Listener) => void }

type Replying = (asked: unknown, sender: Sender, reply: (answer: unknown) => void) => boolean

type Going = { readonly url: string }

export type Chrome = {
  readonly action: {
    readonly onClicked: Heard<() => void>
    readonly setBadgeText: (details: { readonly text: string }) => Promise<void>
    readonly setTitle: (details: { readonly title: string }) => Promise<void>
  }
  readonly runtime: {
    readonly onMessage: Heard<Replying>
    readonly sendMessage: (asked: unknown) => Promise<unknown>
  }
  readonly storage: { readonly local: Area; readonly session: Area }
  readonly tabs: {
    readonly create: (properties: Going) => Promise<Tab>
    readonly update: (id: number, properties: Going) => Promise<Tab | undefined>
  }
}

export function chromeIn(scope: object): Chrome {
  const held = (scope as { readonly chrome?: Chrome }).chrome
  if (held === undefined) throw new Error("no extension runs here, so Chrome handed nothing over")
  return held
}

export function chromeOf(): Chrome {
  return chromeIn(globalThis)
}
