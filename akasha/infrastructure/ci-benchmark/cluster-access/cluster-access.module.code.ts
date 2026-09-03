import { createConnection } from "node:net"
import { z } from "zod"
import { buildkitPort } from "../buildkit-port/buildkit-port.module.code.ts"

export const LOCAL_REGISTRY = "127.0.0.1:5000"

export const DIRECT_BUILDKIT_HOST = "buildkit.buildkit.svc.cluster.local"
export const DIRECT_BUILDKIT_PORT = 1234
export const DIRECT_REGISTRY_HOST = "registry.registry.svc.cluster.local"
export const DIRECT_REGISTRY_PORT = 5000

export async function isPortOpen(host: string, port: number, timeoutMs = 1000): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const sock = createConnection({ host, port }, () => {
      sock.destroy()
      resolve(true)
    })
    sock.on("error", () => resolve(false))
    sock.setTimeout(timeoutMs, () => {
      sock.destroy()
      resolve(false)
    })
  })
}

async function resetPortForward(
  namespace: string,
  service: string,
  localPort: number,
  remotePort: number
): Promise<void> {
  Bun.spawnSync(["pkill", "-f", `port-forward -n ${namespace} svc/${service}`])
  await new Promise((r) => setTimeout(r, 300))

  console.log(`[local-executor] Starting kubectl port-forward to ${service}...`)
  const k8sApiBase = z.string().optional().parse(process.env["K8S_API_BASE"]) ?? ""
  const serverArg = k8sApiBase !== "" ? [`--server=${k8sApiBase}`] : []
  Bun.spawn(
    [
      "kubectl",
      ...serverArg,
      "port-forward",
      "-n",
      namespace,
      `svc/${service}`,
      `${localPort}:${remotePort}`,
    ],
    { stdout: "ignore", stderr: "ignore" }
  ).unref()

  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 500))
    if (await isPortOpen("127.0.0.1", localPort)) {
      console.log(`[local-executor] ${service} port-forward established on localhost:${localPort}`)
      return
    }
  }
  throw new Error(`${service} port-forward failed to become ready after 5s`)
}

async function ensurePortForward(
  namespace: string,
  service: string,
  localPort: number,
  remotePort: number
): Promise<void> {
  if (await isPortOpen("127.0.0.1", localPort)) return
  await resetPortForward(namespace, service, localPort, remotePort)
}

function forcePortForward(): boolean {
  return (
    (z.string().optional().parse(process.env["LOCAL_EXECUTOR_FORCE_PORT_FORWARD"]) ?? "") !== ""
  )
}

export async function ensureBuildkitPortForward(): Promise<void> {
  await ensurePortForward("buildkit", "buildkit", buildkitPort(), DIRECT_BUILDKIT_PORT)
}

export async function ensureRegistryPortForward(): Promise<void> {
  await ensurePortForward("registry", "registry", DIRECT_REGISTRY_PORT, DIRECT_REGISTRY_PORT)
}

export async function resetRegistryPortForward(): Promise<void> {
  if (!forcePortForward() && (await isPortOpen(DIRECT_REGISTRY_HOST, DIRECT_REGISTRY_PORT))) return
  await resetPortForward("registry", "registry", DIRECT_REGISTRY_PORT, DIRECT_REGISTRY_PORT)
}

export async function resetBuildkitPortForward(): Promise<void> {
  if (!forcePortForward() && (await isPortOpen(DIRECT_BUILDKIT_HOST, DIRECT_BUILDKIT_PORT))) return
  await resetPortForward("buildkit", "buildkit", buildkitPort(), DIRECT_BUILDKIT_PORT)
}
