import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import { z } from "zod"

export const FACTORY_BASE = "https://factory.talos.dev"

const SchematicResponse = z.object({ id: z.string().min(1) })

export async function registerSchematic(yaml: string): Promise<string> {
  let res: Response
  try {
    res = await fetch(`${FACTORY_BASE}/schematics`, {
      method: "POST",
      headers: { "content-type": "application/yaml" },
      body: yaml,
    })
  } catch (err) {
    throw new OperationalError(
      `failed to reach ${FACTORY_BASE}/schematics: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  if (!res.ok) {
    const body = await safeReadBody(res)
    throw new OperationalError(`factory.talos.dev /schematics returned ${res.status}: ${body}`)
  }
  let json: unknown
  try {
    json = await res.json()
  } catch (err) {
    throw new DataError(
      `factory.talos.dev /schematics returned non-JSON: ${err instanceof Error ? err.message : String(err)}`
    )
  }
  const parsed = SchematicResponse.safeParse(json)
  if (!parsed.success) {
    throw new DataError(`factory.talos.dev /schematics response missing id field`)
  }
  return parsed.data.id
}

export function metalRawXzUrl(schematicId: string, talosVersion: string): string {
  return `${FACTORY_BASE}/image/${schematicId}/${talosVersion}/metal-amd64.raw.xz`
}

export function installerIsoUrl(schematicId: string, talosVersion: string): string {
  return `${FACTORY_BASE}/image/${schematicId}/${talosVersion}/metal-amd64.iso`
}

export function metalKernelUrl(schematicId: string, talosVersion: string): string {
  return `${FACTORY_BASE}/image/${schematicId}/${talosVersion}/kernel-amd64`
}

export function metalInitramfsUrl(schematicId: string, talosVersion: string): string {
  return `${FACTORY_BASE}/image/${schematicId}/${talosVersion}/initramfs-amd64.xz`
}

export function metalCmdlineUrl(schematicId: string, talosVersion: string): string {
  return `${FACTORY_BASE}/image/${schematicId}/${talosVersion}/cmdline-metal-amd64`
}

async function safeReadBody(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 500)
  } catch {
    return "<unreadable>"
  }
}
