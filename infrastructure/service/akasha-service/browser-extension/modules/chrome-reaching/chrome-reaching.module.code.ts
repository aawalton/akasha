type Tab = { readonly id?: number }

type Sender = { readonly tab?: Tab }

type Area = {
  readonly get: (key: string) => Promise<Readonly<Record<string, unknown>>>
  readonly set: (items: Readonly<Record<string, unknown>>) => Promise<void>
  readonly remove: (key: string) => Promise<void>
}

type Heard<Listener> = { readonly addListener: (listener: Listener) => void }

type Replying = (asked: unknown, sender: Sender, reply: (answer: unknown) => void) => boolean

type Going = { readonly url: string }

type Alarm = { readonly name: string }

export type Chrome = {
  readonly alarms: {
    readonly create: (name: string, info: { readonly periodInMinutes: number }) => Promise<void>
    readonly onAlarm: Heard<(alarm: Alarm) => void>
  }
  readonly action: {
    readonly onClicked: Heard<() => void>
    readonly setBadgeText: (details: { readonly text: string }) => Promise<void>
    readonly setTitle: (details: { readonly title: string }) => Promise<void>
  }
  readonly runtime: {
    readonly onMessage: Heard<Replying>
    readonly sendMessage: (asked: unknown) => Promise<unknown>
    readonly getURL: (path: string) => string
    readonly reload: () => void
  }
  readonly storage: { readonly local: Area; readonly session: Area }
  readonly tabs: {
    readonly create: (properties: Going) => Promise<Tab>
    readonly update: (id: number, properties: Going) => Promise<Tab | undefined>
    readonly get: (id: number) => Promise<Tab>
    readonly query: (info: { readonly url: string }) => Promise<readonly Tab[]>
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
