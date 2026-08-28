import { etcdSnapshotCronJobYaml } from "../synth-etcd-snapshot"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "etcd-snapshot", yaml: etcdSnapshotCronJobYaml() }]
}
