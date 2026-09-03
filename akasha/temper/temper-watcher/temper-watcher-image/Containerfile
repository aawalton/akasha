FROM rust:1.95-alpine3.23 AS rust-builder
ARG COMMIT_SHA
ENV COMMIT_SHA=${COMMIT_SHA}
RUN apk add --no-cache mingw-w64-gcc musl-dev
RUN rustup target add x86_64-pc-windows-gnu
WORKDIR /build
# The crate is held as pages under akasha/temper/watcher-tray. These COPY lines are
# the seam rust-crate calls for: each module is copied to the name Cargo reads, which
# is the `moduleName` its page states. The icon stays outside akasha because
# crate-icon-path holds that a crate's icon lives outside it.
COPY akasha/temper/watcher-tray/Cargo.toml ./Cargo.toml
COPY akasha/temper/watcher-tray/build.rs ./build.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-main/watcher-tray-main.rust-module.rust.rs ./src/main.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-installer/watcher-tray-installer.rust-module.rust.rs ./src/installer.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-logger/watcher-tray-logger.rust-module.rust.rs ./src/logger.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-supervisor/watcher-tray-supervisor.rust-module.rust.rs ./src/supervisor.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-tray/watcher-tray-tray.rust-module.rust.rs ./src/tray.rs
COPY akasha/temper/watcher-tray/pages/watcher-tray-updater/watcher-tray-updater.rust-module.rust.rs ./src/updater.rs
COPY temper-watcher/tray/assets ./assets
RUN mkdir -p .cargo && \
    echo '[target.x86_64-pc-windows-gnu]' > .cargo/config.toml && \
    echo 'linker = "x86_64-w64-mingw32-gcc"' >> .cargo/config.toml && \
    echo 'ar = "x86_64-w64-mingw32-ar"' >> .cargo/config.toml
RUN cargo build --target=x86_64-pc-windows-gnu --release

FROM oven/bun:1.3.14-alpine AS worker-builder
ARG COMMIT_SHA
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV COMMIT_SHA=${COMMIT_SHA}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
WORKDIR /workspace
COPY . .
RUN bun install --frozen-lockfile
RUN mkdir -p /out && \
    bun build --compile --target=bun-windows-x64 \
      --define "__WATCHER_VERSION__=\"${COMMIT_SHA}\"" \
      --define "__SUPABASE_URL__=\"https://supabase.alanwalton.com\"" \
      --define "__SUPABASE_ANON_KEY__=\"${NEXT_PUBLIC_SUPABASE_ANON_KEY}\"" \
      --outfile=/out/temper-watcher-worker.exe \
      akasha/temper/temper-watcher/watcher-worker/watcher-worker.module.code.ts && \
    echo "${COMMIT_SHA}" > /out/version.txt

FROM alpine:3.22 AS final
RUN mkdir -p /build
COPY --from=rust-builder /build/target/x86_64-pc-windows-gnu/release/temper-watcher.exe /build/temper-watcher.exe
COPY --from=worker-builder /out/temper-watcher-worker.exe /build/temper-watcher-worker.exe
COPY --from=worker-builder /out/version.txt /build/version.txt
