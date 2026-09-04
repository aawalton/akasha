export const EMPTY_INPUT_MD5 = "d41d8cd98f00b204e9800998ecf8427e"

export interface ChecksumHashCommandsConfig {
  variable: string
  read: string
  subject: string
}

export function checksumHashCommands({
  variable,
  read,
  subject,
}: ChecksumHashCommandsConfig): readonly string[] {
  const refusal = `checksum subject '${subject}' read empty - refusing to stamp a constant annotation`
  return [
    `${variable}=$(${read} | md5sum | cut -d' ' -f1)`,
    `[ -n "$${variable}" ] && [ "$${variable}" != "${EMPTY_INPUT_MD5}" ] || { echo "${refusal}" >&2; exit 1; }`,
  ]
}
