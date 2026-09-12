import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosRemoteInstall = {
  id: "01a06810-1f0b-741e-a044-c84fec558b56",
  type: "command",
  slug: "talos-remote-install",
  definition: "the command replacing the Linux running on a remote node with Talos, over SSH",
  code: "ts",
  test: "ts",
  taking: [
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "`auto` runs a pre-flight and takes kexec where the host is eligible, else dd.",
    },
    {
      invariantKind: "departure",
      statement:
        "Kernel lockdown, a disabled kexec load or enforcing Secure Boot leaves a host ineligible.",
    },
    {
      invariantKind: "departure",
      statement: "`dd` writes the metal raw image to the disk, makes a UEFI entry and reboots.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kexec path leaves the disk write to the installer `akasha talos apply` triggers.",
    },
    {
      invariantKind: "departure",
      statement: "The run waits up to thirty minutes for maintenance mode to answer on the node.",
    },
    {
      invariantKind: "departure",
      statement: "ssh writes the remote script's own output to the streams the call was made on.",
    },
    {
      invariantKind: "departure",
      statement: "The node is named as a word or after `--node`.",
    },
    {
      invariantKind: "departure",
      statement: "Naming the node twice is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A node the node table does not name is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A method that is not auto or kexec or dd is refused.",
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
      statement: "The node answers at the address that node answered at before the handover.",
    },
    {
      invariantKind: "departure",
      statement: "The node is left in maintenance mode rather than in its cluster.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "The handover is named as soon as the host has taken the script.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw after the handover names the handover in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The reaching and the waiting this runs are handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a disk wipe.",
    },
  ],
  name: "remote-install",
  arguments: [{ argument: "argument/node", required: true, saidAs: "flag-or-word" }],
} as const satisfies Command
