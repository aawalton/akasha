import { z } from "zod"

export const NodeRole = z.enum(["init", "controlplane", "worker"])

export type NodeRole = z.infer<typeof NodeRole>

export const ImageFactoryExtension = z.enum([
  "siderolabs/nvidia-open-gpu-kernel-modules",
  "siderolabs/nonfree-kmod-nvidia",
  "siderolabs/nvidia-container-toolkit",
  "siderolabs/uinput",
])

export type ImageFactoryExtension = z.infer<typeof ImageFactoryExtension>

export const UserVolumeSpec = z.object({
  name: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]*$/, "user volume name must be kebab-case")
    .max(34),
  diskSelector: z.string().min(1),
  minSize: z.string().optional(),
  maxSize: z.string().optional(),
  grow: z.boolean().default(false),
  filesystem: z.enum(["xfs", "ext4"]).default("xfs"),
})

export type UserVolumeSpec = z.infer<typeof UserVolumeSpec>

export const ExtraMount = z.object({
  source: z.string().regex(/^\//, "extraMount source must be an absolute path"),
  destination: z.string().regex(/^\//, "extraMount destination must be an absolute path"),
  options: z.array(z.string()).default(["bind", "rshared", "rw"]),
})

export type ExtraMount = z.infer<typeof ExtraMount>

export const InstallDiskSelector = z
  .object({
    size: z.string().min(1).optional(),
    type: z.enum(["ssd", "hdd", "nvme"]).optional(),
    model: z.string().min(1).optional(),
    busPath: z.string().min(1).optional(),
    serial: z.string().min(1).optional(),
  })
  .strict()
  .refine((s) => Object.values(s).some((v) => v !== undefined), {
    message: "installDiskSelector must set at least one matcher field",
  })

export type InstallDiskSelector = z.infer<typeof InstallDiskSelector>

export const NodeIntent = z
  .object({
    id: z
      .string()
      .regex(/^(?:node|rehearsal)-\d{2}$/, "node id must match node-NN or rehearsal-NN"),
    cluster: z.string().min(1),
    role: NodeRole,
    installDisk: z
      .string()
      .regex(/^\/dev\//)
      .optional(),
    installDiskSelector: InstallDiskSelector.optional(),
    extraKernelArgs: z.array(z.string()).default([]),
    extensions: z.array(ImageFactoryExtension).default([]),
    kernelModules: z.array(z.string()).default([]),
    nodeLabels: z.record(z.string(), z.string()).default({}),
    userVolumes: z.array(UserVolumeSpec).default([]),
    extraMounts: z.array(ExtraMount).default([]),
    ephemeralDiskSelector: z.string().optional(),
  })
  .refine((n) => (n.installDisk === undefined) !== (n.installDiskSelector === undefined), {
    message:
      "exactly one of installDisk (fixed path) or installDiskSelector (property matcher) must be set",
  })
  .refine((n) => n.ephemeralDiskSelector === undefined || n.role !== "worker", {
    message: "ephemeralDiskSelector is control-plane only (etcd does not run on workers)",
  })

export type NodeIntent = z.infer<typeof NodeIntent>

export const ClusterIntent = z.object({
  name: z.string().min(1),
  talosVersion: z.string().regex(/^v\d+\.\d+\.\d+$/, "talos version must be v<x>.<y>.<z>"),
  controlPlaneVip: z
    .string()
    .regex(/^\d{1,3}(\.\d{1,3}){3}$/, "vip must be a dotted-quad IPv4 address")
    .optional(),
  podSubnet: z.string().default("10.244.0.0/16"),
  serviceSubnet: z.string().default("10.96.0.0/12"),
  allowSchedulingOnControlPlanes: z.boolean().default(true),
  registryHosts: z.array(z.string()).default([]),
  registryMirrorEndpoints: z.array(z.string()).default([]),
  etcdQuotaBytes: z.number().int().positive().optional(),
})

export type ClusterIntent = z.infer<typeof ClusterIntent>

export type MachineConfigPatch = Readonly<Record<string, unknown>>

export const ImageFactorySchematic = z.object({
  customization: z.object({
    systemExtensions: z.object({
      officialExtensions: z.array(z.string()),
    }),
    extraKernelArgs: z.array(z.string()).optional(),
  }),
})

export type ImageFactorySchematic = z.infer<typeof ImageFactorySchematic>
