export interface RetryTransientDdlConfig {
  body: readonly string[]
  indent?: string
  heredocEscaped?: boolean
  maxAttempts?: number
  label?: string
}

export function retryTransientDdl({
  body,
  indent = "",
  heredocEscaped = false,
  maxAttempts = 6,
  label = "ensure-role",
}: RetryTransientDdlConfig): readonly string[] {
  const scaffoldHead: readonly string[] = ["run_ddl() {", "set -e"]

  const scaffoldTail: readonly string[] = [
    "}",
    "ddl_attempt=1",
    `ddl_max=${maxAttempts}`,
    "while :; do",
    "  ddl_out=$(run_ddl 2>&1)",
    "  ddl_code=$?",
    '  if [ "$ddl_code" -eq 0 ]; then',
    "    printf '%s\\n' \"$ddl_out\"",
    "    break",
    "  fi",
    "  printf '%s\\n' \"$ddl_out\" >&2",
    '  case "$ddl_out" in',
    '    *"tuple concurrently updated"*|*"deadlock detected"*|*"could not serialize access"*)',
    '      if [ "$ddl_attempt" -lt "$ddl_max" ]; then',
    "        ddl_delay=$(awk -v a=$ddl_attempt 'BEGIN{srand(); printf \"%.2f\", a*0.5+rand()*1.5}')",
    `        echo "${label} DDL hit transient catalog race (attempt $ddl_attempt/$ddl_max); retrying in \${ddl_delay}s" >&2`,
    "        ddl_attempt=$((ddl_attempt+1))",
    '        sleep "$ddl_delay"',
    "        continue",
    "      fi",
    "      ;;",
    "  esac",
    '  exit "$ddl_code"',
    "done",
  ]

  const esc = (line: string): string => (heredocEscaped ? line.replaceAll("$", "\\$") : line)

  return [
    ...scaffoldHead.map((line) => `${indent}${esc(line)}`),
    ...body.map((line) => `${indent}${line}`),
    ...scaffoldTail.map((line) => `${indent}${esc(line)}`),
  ]
}
