import type { ArgRef, ArgRefs, ArgSpec, ProcDef, ReturnSpec, SqlTemplate } from "./types"

export function sql(strings: TemplateStringsArray, ...values: readonly unknown[]): SqlTemplate {
  return {
    __isSqlTemplate: true,
    strings: Array.from(strings),
    values,
  }
}

export function defineProc<A extends Readonly<Record<string, ArgSpec>>, R extends ReturnSpec>(
  def: ProcDef<A, R>
): ProcDef<A, R> {
  return def
}

export function buildArgRefs<A extends Readonly<Record<string, ArgSpec>>>(args: A): ArgRefs<A> {
  const refs = new Map<string, ArgRef>()
  for (const [name, spec] of Object.entries(args)) {
    refs.set(name, makeArgRef(name, spec.type))
  }
  const target: Record<string, ArgRef> = Object.create(null)
  const proxy = new Proxy(target, {
    get(_t, prop) {
      if (typeof prop !== "string") return undefined
      const ref = refs.get(prop)
      if (ref === undefined) {
        throw new Error(
          `proc-template: unknown arg '${prop}' — declared args are: ${Object.keys(args).join(", ")}`
        )
      }
      return ref
    },
  })
  return asArgRefs(proxy)
}

function asArgRefs<A extends Readonly<Record<string, ArgSpec>>>(
  proxy: Record<string, ArgRef>
): ArgRefs<A> {
  return proxy as ArgRefs<A>
}

function makeArgRef(name: string, type: string): ArgRef {
  return { __isArgRef: true, name, type }
}

export function isArgRef(v: unknown): v is ArgRef {
  if (typeof v !== "object" || v === null) return false
  if (!("__isArgRef" in v)) return false
  const tag = v.__isArgRef
  return tag === true
}
