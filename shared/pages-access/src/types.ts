import type { Json } from "../../supabase-database/src/generated/database"


export type JsonObjectInput<T> = {
  [K in keyof T]: T[K] extends Json | undefined
    ? T[K]
    : T[K] extends readonly (infer U)[]
      ? readonly JsonObjectInput<U>[]
      : T[K] extends (infer U)[]
        ? JsonObjectInput<U>[]
        : T[K] extends object
          ? JsonObjectInput<T[K]>
          : never
}

export type PagePropertiesInput<T extends Record<string, unknown>> = T & JsonObjectInput<T>

export type PageOrder = readonly { by: string; dir: "asc" | "desc" }[]

export type PageCursor = string

export type PageSelect = readonly string[]

export type JsonPatchOp =
  | { op: "replace"; path: string; value: Json }
  | { op: "add"; path: string; value: Json }
  | { op: "remove"; path: string }
export type JsonPatch = readonly JsonPatchOp[]
