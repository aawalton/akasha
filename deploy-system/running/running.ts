import type { ClusterService } from "../service/service.ts"
import { runKubectl } from "../kubectl/kubectl.ts"

export interface Running {
  readonly kind: string
  readonly namespace: string
  readonly name: string
}

export type Reached =
  | { readonly reached: true; readonly workloads: readonly Running[] }
  | { readonly reached: false; readonly why: string }

const AT = '{range .items[*]}{.metadata.namespace}/{.metadata.name}{"\\n"}{end}'

export function keyOf(one: Running): string {
  return `${one.kind}/${one.namespace}/${one.name}`
}

export function workloadOf(service: ClusterService): Running {
  return {
    kind: service.resourceKind,
    namespace: service.namespace,
    name: service.resourceName,
  }
}

export function kindsOf(services: readonly ClusterService[]): readonly string[] {
  return [...new Set(services.map((one) => one.resourceKind))].sort()
}

function workloadsOf(kind: string, stdout: string): readonly Running[] {
  const found: Running[] = []
  for (const line of stdout.split("\n")) {
    const at = line.indexOf("/")
    if (at === -1) continue
    found.push({ kind, namespace: line.slice(0, at), name: line.slice(at + 1) })
  }
  return found
}

/**
 * Every workload of the named kinds the cluster is running.
 *
 * THE KINDS ARE THE ONES THE PAGES NAME rather than a list written here, so a page naming a kind
 * nothing has named before is asked after on the run it arrives in.
 *
 * ONE CALL PER KIND, AND A KIND THAT COULD NOT BE READ LOSES THE WHOLE ANSWER. A set short of one
 * kind reads exactly like a cluster running none of that kind, and every page naming it would then
 * be reported as a service that is not there.
 */
export function runningOf(kinds: readonly string[]): Reached {
  const workloads: Running[] = []
  for (const kind of kinds) {
    const ran = runKubectl(["get", kind, "-A", "-o", `jsonpath=${AT}`])
    if (ran.code !== 0) {
      return {
        reached: false,
        why: `kubectl could not list ${kind}: ${ran.stderr.trim() || `it exited ${ran.code}`}`,
      }
    }
    for (const one of workloadsOf(kind, ran.stdout)) workloads.push(one)
  }
  return { reached: true, workloads }
}

/**
 * Every workload the cluster runs that no page names.
 *
 * A DEPLOYED SERVICE WITH NO PAGE IS THE ONE NOTHING ELSE REPORTS: it is emitted by no synth here,
 * so no deploy names it and no check reaches it, and it goes on running until somebody notices it
 * by hand.
 */
export function unpaged(
  workloads: readonly Running[],
  services: readonly ClusterService[]
): readonly Running[] {
  const paged = new Set(services.map((one) => keyOf(workloadOf(one))))
  return [...workloads]
    .filter((one) => !paged.has(keyOf(one)))
    .sort((one, other) => keyOf(one).localeCompare(keyOf(other)))
}
