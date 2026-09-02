interface EventManagerLike {
  RegisterForEvent: (
    this: EventManagerLike,
    namespace: string,
    eventId: number,
    callback: (this: void, ...args: unknown[]) => undefined
  ) => undefined
  UnregisterForEvent: (this: EventManagerLike, namespace: string, eventId: number) => undefined
}

interface XmlHandlerControlLike {
  m_owner?: Record<string, unknown> | undefined
  m_dropdownObject?: Record<string, unknown> | undefined
  toggleFunction?: unknown
  checked?: unknown
  GetParent: (this: XmlHandlerControlLike) => XmlHandlerControlLike
  GetHandler: (
    this: XmlHandlerControlLike,
    handlerName: string
  ) => ((...args: unknown[]) => unknown) | undefined
  SetHandler: (
    this: XmlHandlerControlLike,
    handlerName: string,
    handler: (...args: unknown[]) => unknown
  ) => undefined
  GetOwningWindow: (this: XmlHandlerControlLike) => XmlOwningWindowLike | undefined
  [key: string]: unknown
}

interface XmlOwningWindowLike {
  object?: Record<string, unknown> | undefined
  [key: string]: unknown
}
