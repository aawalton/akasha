export type PgType =
  | "text"
  | "uuid"
  | "jsonb"
  | "boolean"
  | "int"
  | "bigint"
  | "numeric"
  | "text[]"
  | "uuid[]"
  | "void"
  | (string & {})

export interface ArgSpec {
  type: PgType
  nullable?: boolean
  default?: string
}

export type ReturnSpec =
  | { kind: "scalar"; type: PgType }
  | { kind: "table"; columns: Readonly<Record<string, PgType>> }
  | { kind: "setof"; type: PgType }
  | { kind: "void" }

export interface ProcMeta {
  securityDefiner?: boolean
  searchPath?: readonly string[]
  immutable?: boolean
  stable?: boolean
  grants?: {
    revokeFromPublic?: boolean
    grantTo?: readonly string[]
  }
}

export interface ArgRef {
  readonly __isArgRef: true
  readonly name: string
  readonly type: PgType
}

export type ArgRefs<A extends Readonly<Record<string, ArgSpec>>> = {
  readonly [K in keyof A]: ArgRef
}

export interface SqlTemplate {
  readonly __isSqlTemplate: true
  readonly strings: readonly string[]
  readonly values: readonly unknown[]
}

export interface ProcDef<A extends Readonly<Record<string, ArgSpec>>, R extends ReturnSpec> {
  readonly name: string
  readonly args: A
  readonly returns: R
  readonly body: (args: ArgRefs<A>) => SqlTemplate
  readonly meta?: ProcMeta
}
