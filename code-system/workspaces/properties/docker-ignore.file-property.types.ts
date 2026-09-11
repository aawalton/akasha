import type { dockerIgnore } from "akasha/code-system/workspaces/properties/docker-ignore.file-property.ts"

export type DockerIgnore = (typeof dockerIgnore.extensions)[number]
