import type { namedEventKind } from "akasha/story/named-event/properties/named-event-kind.select-property.ts"

export type NamedEventKind = (typeof namedEventKind.values)[number]
