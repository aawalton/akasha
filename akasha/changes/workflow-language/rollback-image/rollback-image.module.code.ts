export interface RollbackImageCommandsConfig {
  namespace: string
  deployment: string
}

export function rollbackImageCommands({
  namespace,
  deployment,
}: RollbackImageCommandsConfig): readonly string[] {
  return [`kubectl rollout undo -n ${namespace} deployment/${deployment}`]
}
