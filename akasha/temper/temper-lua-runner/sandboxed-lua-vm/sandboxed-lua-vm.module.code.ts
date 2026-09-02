import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  luaLongStringLiteral,
  luaStringLiteral,
  marshalLuaValue,
} from "../lua-marshal/lua-marshal.module.code.ts"
import { makeLuaVm } from "../lua-vm/lua-vm.module.code.ts"

const PRELUDE_PATH = resolve(
  import.meta.dir,
  "../eso-sandbox-prelude/eso-sandbox-prelude.lua-module.lua.lua"
)

let cachedPrelude: string | null = null

function preludeText(): string {
  if (cachedPrelude === null) cachedPrelude = readFileSync(PRELUDE_PATH, "utf8")
  return cachedPrelude
}

export type SandboxedLuaVm = {
  readonly setGlobal: (name: string, value: unknown) => undefined
  readonly doString: (source: string) => Promise<unknown>
  readonly close: () => Promise<void>
}

export type MakeSandboxedLuaVmOptions = {
  readonly bannedGlobals: readonly string[]
}

export async function makeSandboxedLuaVm(
  options: MakeSandboxedLuaVmOptions
): Promise<SandboxedLuaVm> {
  const luaVm = await makeLuaVm()
  await luaVm.run(`__eso_banned = ${marshalLuaValue([...options.bannedGlobals])}`)
  await luaVm.run(preludeText())

  const pendingSeeds: string[] = []

  async function flushSeeds(): Promise<void> {
    if (pendingSeeds.length === 0) return
    const script = pendingSeeds.join("\n")
    pendingSeeds.length = 0
    await luaVm.run(script)
  }

  return {
    setGlobal(name, value): undefined {
      const literalName = luaStringLiteral(name)
      if (typeof value === "function") {
        pendingSeeds.push(`__eso_seed(${literalName}, __eso_make_stub())`)
        return undefined
      }
      try {
        pendingSeeds.push(`__eso_seed(${literalName}, ${marshalLuaValue(value)})`)
      } catch {
        pendingSeeds.push(`__eso_seed(${literalName}, __eso_make_stub())`)
      }
      return undefined
    },
    async doString(source): Promise<unknown> {
      await flushSeeds()
      return luaVm.run(`return __eso_run(${luaLongStringLiteral(source)}, "bundle")`)
    },
    async close(): Promise<void> {
      await luaVm.close()
    },
  }
}

export async function withSandboxedLuaVm<T>(
  options: MakeSandboxedLuaVmOptions,
  fn: (vm: SandboxedLuaVm) => Promise<T>
): Promise<T> {
  const vm = await makeSandboxedLuaVm(options)
  try {
    return await fn(vm)
  } finally {
    await vm.close()
  }
}
