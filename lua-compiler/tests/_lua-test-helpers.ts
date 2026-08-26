import { makeLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { LuaTarget } from "../src/CompilerOptions"
import { type BuiltLuaLib, buildLuaLib } from "../src/lualib-builder"

export interface LualibVm {
  readonly run: (script: string) => Promise<unknown>
  readonly close: () => Promise<void>
  readonly get: (name: string) => unknown
}

export interface MakeLualibVmOptions {
  readonly stubs?: string
  readonly target?: LuaTarget
}

const builtLualibCache = new Map<LuaTarget, BuiltLuaLib>()

function getBuiltLualib(target: LuaTarget): BuiltLuaLib {
  const cached = builtLualibCache.get(target)
  if (cached !== undefined) return cached
  const built = buildLuaLib(target)
  builtLualibCache.set(target, built)
  return built
}

const SNAPSHOT_SCRIPT = `
local s = {}
for k, v in pairs(_G) do
  if not __initial_globals[k] and k ~= "__initial_globals" then
    s[k] = v
  end
end
return s
`

export async function makeLualibVm(options: MakeLualibVmOptions = {}): Promise<LualibVm> {
  const target = options.target ?? LuaTarget.Lua51
  const built = getBuiltLualib(target)
  const luaVm = await makeLuaVm()
  await luaVm.run(`____lualib = (function() ${built.fullBundle} end)()`)
  if (options.stubs !== undefined && options.stubs.length > 0) {
    await luaVm.run(options.stubs)
  }
  await luaVm.run(
    `__initial_globals = {}; for k, _ in pairs(_G) do __initial_globals[k] = true end`
  )

  let snapshot: Record<string, unknown> = {}

  return {
    async run(script: string): Promise<unknown> {
      const result = await luaVm.run(script)
      const snap = await luaVm.run(SNAPSHOT_SCRIPT)
      if (snap !== null && typeof snap === "object" && !Array.isArray(snap)) {
        const next: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(snap)) {
          next[k] = v
        }
        snapshot = next
      }
      return result
    },
    get(name: string): unknown {
      const value = snapshot[name]
      return value === undefined ? null : value
    },
    async close(): Promise<void> {
      await luaVm.close()
    },
  }
}

export async function withLualibVm<T>(fn: (vm: LualibVm) => Promise<T>): Promise<T>
export async function withLualibVm<T>(
  options: MakeLualibVmOptions,
  fn: (vm: LualibVm) => Promise<T>
): Promise<T>
export async function withLualibVm<T>(
  optsOrFn: MakeLualibVmOptions | ((vm: LualibVm) => Promise<T>),
  maybeFn?: (vm: LualibVm) => Promise<T>
): Promise<T> {
  const opts: MakeLualibVmOptions = typeof optsOrFn === "function" ? {} : optsOrFn
  const fn = typeof optsOrFn === "function" ? optsOrFn : maybeFn
  if (fn === undefined) throw new Error("withLualibVm: fn argument is required")
  const vm = await makeLualibVm(opts)
  try {
    return await fn(vm)
  } finally {
    await vm.close()
  }
}
