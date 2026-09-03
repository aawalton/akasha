import { reasonText } from "../idle-reason-copy/idle-reason-copy.module.code.ts"

export function ErrorMessage({ reason }: { reason: string | null | undefined }) {
  if (reason === null || reason === undefined) {
    return null
  }
  return <span className="font-mono text-secondary text-xs">{reasonText(reason)}</span>
}
