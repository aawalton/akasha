export type Fault = "caller" | "service" | "race"

type Refused = { readonly refused: string }

export type Refusal = Refused & { readonly fault: Fault }

export type Faulted<T> = Exclude<T, Refused> | (Extract<T, Refused> & { readonly fault: Fault })

export const STATUS_FOR: Readonly<Record<Fault, number>> = {
  caller: 400,
  service: 500,
  race: 409,
}
