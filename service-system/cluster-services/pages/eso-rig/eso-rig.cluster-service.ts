import type { ClusterService } from "../../cluster-service.page-type.ts"

export const esoRig = {
  id: "01a06866-58f8-774b-9824-ef1ea3f4ea3d",
  pageTypeSlug: "cluster-service",
  slug: "eso-rig",
  definition: "what runs the Elder Scrolls Online client with nobody at a keyboard",
  resourceKind: "Deployment",
  namespace: "eso-rig",
  resourceName: "eso-rig",
  image: "registry.registry.svc.cluster.local:5000/cluster/eso-rig:serving",
  replicas: 0,
  manifestCode:
    "service-system/cluster-services/pages/eso-rig/eso-rig.cluster-service.code.attachment.ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod is privileged.",
    },
    {
      invariantKind: "constraint",
      statement: "The GPU runtime class gives no device capability the rig needs.",
    },
    {
      invariantKind: "constraint",
      statement: "Creating the virtual keyboard needs the uinput device.",
    },
    {
      invariantKind: "constraint",
      statement: "An unprivileged container's device cgroup denies opening an event node.",
    },
    {
      invariantKind: "constraint",
      statement: "A denied event node leaves the evdev driver unable to bind the device.",
    },
    {
      invariantKind: "constraint",
      statement: "A denied event node leaves the evdev driver unable to grab the device.",
    },
    {
      invariantKind: "constraint",
      statement: "The X server opens a virtual terminal under the dummy driver.",
    },
    {
      invariantKind: "departure",
      statement: "The pod mounts the host's /dev/input live.",
    },
    {
      invariantKind: "constraint",
      statement: "Privilege without that mount leaves the rig failing before a verdict is reached.",
    },
    {
      invariantKind: "constraint",
      statement: "A container's own /dev is filled once at startup and never again.",
    },
    {
      invariantKind: "departure",
      statement: "The node the rig makes after startup is the only node the rig reads.",
    },
    {
      invariantKind: "departure",
      statement: "Card access comes from the runtime class and the resource request.",
    },
    {
      invariantKind: "absence",
      statement: "Privilege gives the pod no card access.",
    },
    {
      invariantKind: "departure",
      statement: "The rig is scheduled onto the one node in its workload class.",
    },
    {
      invariantKind: "departure",
      statement: "The rig runs no copies until a run is wanted.",
    },
    {
      invariantKind: "departure",
      statement: "The Wine prefix is kept on the node's disk.",
    },
    {
      invariantKind: "constraint",
      statement: "A fresh Wine prefix creates a new machine identity against the game account.",
    },
  ],
} as const satisfies ClusterService
