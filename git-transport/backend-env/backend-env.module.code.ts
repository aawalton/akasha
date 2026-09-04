import { z } from "zod"

const ENV_OPTIONAL = z.string().optional()
const PATH_DEFAULT = z
  .string()
  .default("/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin")
const GIT_TRANSPORT_PORT_DEFAULT = z.string().default("3000")

export type BackendEnvInput = {
  readonly pathInfo: string
  readonly queryString: string
  readonly remoteUser: string
  readonly method: string
  readonly contentType: string
  readonly contentLength: string
  readonly isGzip: boolean
  readonly processEnv: Record<string, string | undefined>
}

export function backendEnv(input: BackendEnvInput): Record<string, string> {
  const accessToken = ENV_OPTIONAL.parse(input.processEnv.GITHUB_ACCESS_TOKEN)
  return {
    PATH: PATH_DEFAULT.parse(input.processEnv.PATH),
    GIT_PROJECT_ROOT: "/data/git/repositories",
    GIT_HTTP_EXPORT_ALL: "1",
    GIT_TRANSPORT_PORT: GIT_TRANSPORT_PORT_DEFAULT.parse(input.processEnv.GIT_TRANSPORT_PORT),
    PATH_INFO: input.pathInfo,
    QUERY_STRING: input.queryString,
    REQUEST_METHOD: input.method,
    CONTENT_TYPE: input.contentType,
    CONTENT_LENGTH: input.isGzip ? "" : input.contentLength,
    REMOTE_USER: input.remoteUser,
    SERVER_PROTOCOL: "HTTP/1.1",
    ...(accessToken != null && { GITHUB_ACCESS_TOKEN: accessToken }),
  }
}
