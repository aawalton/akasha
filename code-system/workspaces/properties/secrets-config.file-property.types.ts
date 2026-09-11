import type { secretsConfig } from "akasha/code-system/workspaces/properties/secrets-config.file-property.ts"

export type SecretsConfig = (typeof secretsConfig.extensions)[number]
