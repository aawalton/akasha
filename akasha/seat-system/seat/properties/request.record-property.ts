import type { RecordProperty } from "../../../pages-system/record-property/record-property.page-type.ts"
import type { InterruptMessage } from "./interrupt-message.text-property.ts"
import type { RequestedAction } from "./requested-action.text-property.ts"
import type { RestartArmedAt } from "./restart-armed-at.instant-property.ts"

export type Request = {
  action: RequestedAction
  message?: InterruptMessage
  armedAt?: RestartArmedAt
}

export const request = {
  id: "01a0542c-d18b-71bb-99a6-64c5edfe6321",
  pageTypeSlug: "record-property",
  slug: "request",
  propertySlug: "request",
  definition: "what has been asked of a seat and not yet carried out",
  properties: [
    { pagePropertySlug: "requested-action", required: true, many: false },
    { pagePropertySlug: "interrupt-message", required: false, many: false },
    { pagePropertySlug: "restart-armed-at", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat holds one request or none.",
    },
    {
      invariantKind: "departure",
      statement: "A new one takes the place of what stood.",
    },
    {
      invariantKind: "departure",
      statement: "A request goes when it is carried out.",
    },
  ],
} as const satisfies RecordProperty
