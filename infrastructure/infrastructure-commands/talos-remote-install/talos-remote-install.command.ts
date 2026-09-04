import type { Command } from "@akasha/command-system/command"

export const talosRemoteInstall = {
  id: "01a06810-1f0b-741e-a044-c84fec558b56",
  pageTypeSlug: "command",
  slug: "talos-remote-install",
  definition: "the command replacing the Linux running on a remote node with Talos, over SSH",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<node>", takes: "the node to install, said as a word rather than after `--node`" },
    {
      said: "--node <id>",
      takes: "the node to install, which settles its schematic and install disk",
    },
    {
      said: "--ip <ip>",
      takes: "the address the running host answers at, and answers at as Talos",
    },
    {
      said: "--ssh-user <user>",
      takes: "the user to reach the host as, holding sudo without a password",
    },
    { said: "--ssh-key <path>", takes: "the private key that user is reached with" },
    {
      said: "--method <auto|kexec|dd>",
      takes: "how the host hands over, `auto` where none is said",
    },
    { said: "--confirm-wipe", takes: "the acknowledgement that the install disk is overwritten" },
  ],
  helpNotes: [
    "`auto` runs a pre-flight on the host and takes kexec where the host is eligible, else it falls back to writing the disk.",
    "`kexec` refuses rather than falling back, and is what closes the UEFI NVRAM gap the dd path works around.",
    "`dd` streams the metal raw image onto the disk, runs efibootmgr to make a UEFI entry, and reboots.",
    "the dd path wipes at once, where the kexec path defers the disk write to the installer that `talos-apply` triggers.",
    "kexec is blocked by kernel lockdown, by a disabled kexec load and by enforcing Secure Boot, and the pre-flight reads all three.",
    "the run waits up to thirty minutes for Talos maintenance mode to answer on the node, and leaves it there for `talos-apply`.",
    "ssh writes the remote script's own output to the streams this was called on, so that output is not in the report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`, and naming both is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A method that is none of auto, kexec and dd is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node stating a disk selector rather than a disk takes the kexec method alone.",
    },
    {
      invariantKind: "departure",
      statement: "A run lacking `--confirm-wipe` is refused before the host is reached.",
    },
    {
      invariantKind: "departure",
      statement: "The schematic is registered before the host is reached.",
    },
    {
      invariantKind: "departure",
      statement: "The kexec script refuses rather than falling back to writing the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The node answers at the address it answered at before the handover.",
    },
    {
      invariantKind: "departure",
      statement: "The node is left in maintenance mode rather than in its cluster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a disk wipe.",
    },
  ],
} as const satisfies Command
